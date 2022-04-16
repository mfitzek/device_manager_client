<template>
    <div>
        <Line :chart-data="chartData" :chart-options="options" :height="200" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";

import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale, TimeSeriesScale, ChartDataset } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale, TimeSeriesScale);

import { ChartData, ChartOptions } from "chart.js";

import "chartjs-adapter-moment";
import { computed } from "@vue/reactivity";
import { IAttribute } from "@/types/device";

export default defineComponent({
    components: { Line },

    props: {
        data: {
            type: Object as PropType<IAttribute[]>,
            required: true,
        },
    },

    setup(props) {
        const data: ChartData = {
            datasets: [
                {
                    label: "Sample data",
                    data: [],
                    borderColor: "#" + Math.round(0xffffff * Math.random()).toString(16),
                    parsing: {
                        xAxisKey: "createdAt",
                        yAxisKey: "value",
                    },
                },
            ],
        };

        const chartData = computed((): ChartData<"line"> => {
            return {
                datasets: props.data.map((attr): ChartDataset<"line"> => {
                    return {
                        label: attr.name,
                        borderColor: "#" + Math.round(0xffffff * Math.random()).toString(16),
                        parsing: {
                            xAxisKey: "createdAt",
                            yAxisKey: "value",
                        },
                        // @ts-expect-error
                        data: attr.telemetry
                    };
                }),
            };
        });

        //ref(data);

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

        return { chartData, options };
    },
});
</script>

<style scoped></style>
