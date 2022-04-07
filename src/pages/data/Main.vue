<template>
    <div class="row">
        <div class="col-3 q-pa-sm">
            <q-input label="Search" outlined class="q-py-md" type="search" v-model="search">
                <template v-slot:append>
                    <q-icon name="search" search />
                </template>
            </q-input>
            <q-scroll-area style="height: 80vh">
                <q-list bordered separator>
                    <q-expansion-item v-for="dev in filtered_attributes" :label="dev.name" default-opened>
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
                <div class="col-3 q-pa-md">
                    <q-select v-model="range" label="Show data" :options="['Last day', 'Last week', 'Last month']" filled></q-select>
                </div>
                <div class="col-3">
                    <DateTimePicker v-model="date_start" label="Date Start"></DateTimePicker>
                </div>
                <div class="col-3">
                    <DateTimePicker v-model="date_end" label="Date End"></DateTimePicker>
                </div>
                <div class="col-3 q-pa-md">
                    <q-btn color="primary" @click="fetch_data()" icon-right="refresh">Refresh</q-btn>
                </div>
            </div>
            <Line :chart-data="chartData" :chart-options="options" :height="200" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import DateTimePicker from "@/components/common/DateTimePicker.vue";

import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale, Plugin, TimeSeriesScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale, TimeSeriesScale);

import { ChartData, ChartOptions } from "chart.js";

import { GetDevicesAttributes, FetchTelemetry } from "@store/device";
import { IAttribute, IDeviceAttributes } from "@/types/device";

import "chartjs-adapter-moment";
import { computed } from "@vue/reactivity";
import { date } from "quasar";

export default defineComponent({
    components: { Line, DateTimePicker },
    setup() {
        const data: ChartData = {
            datasets: [
                {
                    label: "Sample data",
                    data: [
                        { createdAt: "2022/01/01", value: 84 },
                        { createdAt: "2022/02/01", value: 54 },
                        { createdAt: "2022/03/01", value: 38 },
                        { createdAt: "2022/04/01", value: 55 },
                        { createdAt: "2022/05/01", value: 14 },
                        { createdAt: "2022/06/01", value: 3 },
                        { createdAt: "2022/07/01", value: 26 },
                        { createdAt: "2022/08/01", value: 96 },
                        { createdAt: "2022/09/01", value: 68 },
                        { createdAt: "2022/10/01", value: 100 },
                        { createdAt: "2022/11/01", value: 90 },
                        { createdAt: "2022/12/01", value: 40 },
                    ],
                    borderColor: "#" + Math.round(0xffffff * Math.random()).toString(16),
                    parsing: {
                        xAxisKey: "createdAt",
                        yAxisKey: "value",
                    },
                },
            ],
        };

        const chartData = ref(data);

        const opt: ChartOptions = {
            scales: {
                x: {
                    type: "time",
                },
            },
            elements: {
                point: {
                    radius: 1,
                },
            },
        };

        const options = ref(opt);

        let date_start = ref<Date | null>(null);
        let date_end = ref<Date | null>(null);
        let range = ref("Last day");
        let search = ref("");

        let devices = ref<IDeviceAttributes[]>([]);
        let selected = ref<number[]>([]);

        watch(
            range,
            (val) => {
                console.log("Range watcher", val);
                if (val == "Last day") {
                    date_end.value = new Date();
                    date_start.value = new Date();
                    date_start.value.setDate(date_start.value.getDate() - 1);
                }
                if (val == "Last week") {
                    date_end.value = new Date();
                    date_start.value = new Date();
                    date_start.value.setDate(date_start.value.getDate() - 7);
                }
                if (val == "Last month") {
                    date_end.value = new Date();
                    date_start.value = new Date();
                    date_start.value.setDate(date_start.value.getDate() - 30);
                }
            },
            { immediate: true }
        );

        const filtered_attributes = computed(() => {
            return devices.value.filter((dev) => {
                return dev.name.includes(search.value) || dev.attributes.find((a) => a.name.includes(search.value));
            });
        });

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
            const attributes = await FetchTelemetry(ids, start, end);
            let i = 0;

            console.log(attributes);

            chartData.value.datasets = attributes.map((a: any) => {
                return {
                    label: a.name,
                    data: a.Telemetry.filter((d: any) => d.value != null),
                    borderColor: "#" + Math.round(0xffffff * Math.random()).toString(16),
                    parsing: {
                        xAxisKey: "createdAt",
                        yAxisKey: "value",
                    },
                };
            });

            if (date_start.value) {
                options.value!.scales!.x!.min = start;
            }

            if (date_end.value) options.value!.scales!.x!.max = end;

            console.log(options.value);
            console.log(chartData.value);
        }

        onBeforeMount(async () => {
            devices.value = await GetDevicesAttributes();
        });

        return { devices, click_attr, is_active, chartData, options, date_start, date_end, fetch_data, range, search, filtered_attributes };
    },
});
</script>

<style scoped></style>
