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

            <div class="row q-col-gutter-md">
                <div class="col">
                    <q-select label="Export format" v-model="selected_format" outlined :options="formats" emit-value></q-select>
                </div>
                <div class="col q-mt-sm">
                    <q-btn label="Export data" icon-right="file_download" @click="export_data"></q-btn>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <q-tabs v-model="tab" class="text-primary">
                        <q-tab name="stats" icon="description" label="Data" />
                        <q-tab name="graph" icon="show_chart" label="Graph" />
                    </q-tabs>
                </div>
            </div>

            <div class="row q-mt-md">
                <div class="col" v-if="tab == 'graph'">
                    <MyGraph :data="graph_data"></MyGraph>
                </div>
                <div class="col" v-if="tab == 'stats'">
                    <MyStats :data="fetched_data" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import DateTimePicker from "@/components/common/DateTimePicker.vue";

import { GetDevicesAttributes, FetchTelemetry, ExportTelemetry } from "@store/device";
import { IAttribute, IDeviceAttributes } from "@/types/device";

import { computed } from "@vue/reactivity";
import MyGraph from "@components/data/graph.vue";
import MyStats from "@components/data/stats.vue";
import { json } from "stream/consumers";

export default defineComponent({
    components: { DateTimePicker, MyGraph, MyStats },
    setup() {
        let date_start = ref<Date | null>(null);
        let date_end = ref<Date | null>(null);
        let range = ref("Last day");
        let search = ref("");

        const attribute_list = ref<IDeviceAttributes[]>([]);
        const fetched_data = ref<IDeviceAttributes[]>([]);

        let selected = ref<number[]>([]);

        const tab = ref("stats");

        watch(
            range,
            (val) => {
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
            return attribute_list.value.filter((dev) => {
                return dev.name.includes(search.value) || dev.attributes.find((a) => a.name.includes(search.value));
            });
        });

        const graph_data = computed(() => {
            const attributes: IAttribute[] = [];
            for (const dev of fetched_data.value) {
                attributes.push(...dev.attributes);
            }
            return attributes;
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

        async function fetch_data() {
            let ids = [...selected.value];
            let start = date_start.value as Date;
            let end = date_end.value as Date;
            const attributes = await FetchTelemetry(ids, start, end);
            fetched_data.value = attributes;
        }

        onBeforeMount(async () => {
            attribute_list.value = await GetDevicesAttributes();
        });

        const formats = ["json", "xml", "csv"];

        const selected_format = ref<"xml" | "json" | "csv">("json");

        async function export_data() {
            let ids = [...selected.value];
            let start = date_start.value as Date;
            let end = date_end.value as Date;
            const data = await ExportTelemetry(selected_format.value, ids, start, end);

            if (selected_format.value == "xml") {
                const url = window.URL.createObjectURL(new Blob([...data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "export.xml");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            else if (selected_format.value == "json") {
                const url = window.URL.createObjectURL(new Blob([...JSON.stringify(data)]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "export.json");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }   else if (selected_format.value == "csv") {
                const url = window.URL.createObjectURL(new Blob([...data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "export.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

        }

        return {
            graph_data,
            click_attr,
            is_active,
            date_start,
            date_end,
            fetch_data,
            range,
            search,
            filtered_attributes,
            tab,
            fetched_data,
            formats,
            selected_format,
            export_data,
        };
    },
});
</script>

<style scoped></style>
