<template>
    <div class="row">
        <div class="col-3 q-pa-sm">
            <q-scroll-area style="height: 90vh">
                <q-list bordered separator>
                    <q-expansion-item v-for="dev in devices" :label="dev.name" default-opened>
                        <q-list>
                            <q-item v-for="attr in dev.attributes" clickable @click="click_attr(attr.id!)" :active="is_active(attr.id!)">
                                <q-item-section>{{ attr.name }}</q-item-section>
                                <q-item-section>{{ attr.type }}</q-item-section>
                            </q-item>
                        </q-list>
                    </q-expansion-item>
                </q-list>
            </q-scroll-area>
        </div>
        <div class="col-9 q-pa-sm">
            <div class="row">
                <div class="col-auto">
                    <DateTimePicker v-model="date_start" label="Date Start"></DateTimePicker>
                </div>
                <div class="col-auto">
                    <DateTimePicker v-model="date_end" label="Date End"></DateTimePicker>
                </div>
                <div class="col-auto">
                    <q-btn @click="fetch_data()">Refresh</q-btn>
                </div>
            </div>
            <Line :chart-data="chartData" :chart-options="options" :height="200" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import DateTimePicker from "@/components/common/DateTimePicker.vue";

import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale, Plugin, TimeSeriesScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale, TimeSeriesScale);

import { ChartData, ChartOptions } from "chart.js";

import { GetDevicesAttributes, FetchTelemetry } from "@store/device";
import { IDeviceAttributes } from "@/types/device";

import "chartjs-adapter-moment";

export default defineComponent({
    components: { Line, DateTimePicker },
    setup() {
        const data: ChartData = {
            datasets: [
                {
                    label: "test",
                    data: [
                        { x: "2021-04-01", y: 86 },
                        { x: "2021-04-02", y: 51 },
                        { x: "2021-04-03", y: 36 },
                        { x: "2021-04-04", y: 36 },
                        { x: "2021-04-05", y: 26 },
                        { x: "2021-04-06", y: 19 },
                        { x: "2021-04-07", y: 96 },
                        { x: "2021-04-08", y: 63 },
                        { x: "2021-04-09", y: 85 },
                        { x: "2021-04-10 10:25:54", y: 46 },
                        { x: "2021-04-10 11:25:54", y: 50 },
                        { x: "2021-04-10 13:25:54", y: 46 },
                        { x: "2021-04-10 20:25:54", y: 48 },
                        { x: "2021-04-10 20:25:54", y: 46 },
                    ],
                },
            ],
        };

        const chartData = ref(data);

        const opt: ChartOptions = {
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "hour",
                    },
                },
            },
                elements: {
                    point:{
                        radius: 0
                    }
                }
            
        };

        const options = ref(opt);

        let date_start = ref<Date | null>(null);
        let date_end = ref<Date | null>(null);

        let devices = ref<IDeviceAttributes[]>([]);

        let selected = ref<number[]>([]);

        function is_active(attr_id: number) {
            return selected.value.includes(attr_id);
        }

        async function click_attr(attr_id: number) {
            let idx = selected.value.findIndex((a) => a == attr_id);
            if (idx >= 0) {
                selected.value.splice(idx, 1);
            } else {
                selected.value.push(attr_id);
            }
        }

        let colors = ["#FF1000", "#0010FF", "#00FF00"];

        async function fetch_data() {
            let ids = [...selected.value];
            let start = date_start.value as Date;
            let end = date_end.value as Date;
            const values = (await FetchTelemetry(ids, start, end)).filter((a: any) => a.value != null);
            let i = 0;
            chartData.value.datasets = selected.value.map((a) => {
                let name = devices.value.find((attr) => attr.id == a);
                return {
                    label: name?.name,
                    data: values.map((v: any) => {
                        return {
                            x: v.createdAt,
                            y: v.value,
                        };
                    }),
                    borderColor: colors[i++]
                };
            });
           // options.value!.scales!.x!.min = Math.min(...values.map((v:any)=>v.value));

            console.log(options.value);
            console.log(chartData.value);
        }

        onBeforeMount(async () => {
            devices.value = await GetDevicesAttributes();
        });

        return { devices, click_attr, is_active, chartData, options, date_start, date_end, fetch_data };
    },
});
</script>

<style scoped></style>
