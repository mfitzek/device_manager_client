<template>
    <div>
        <Line :chart-data="chartData" :chart-options="options" :height="200" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'


import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale, TimeSeriesScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale, TimeSeriesScale);

import { ChartData, ChartOptions } from "chart.js";

import "chartjs-adapter-moment";


export default defineComponent({
    components: { Line},
    setup () {
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

        return {chartData, options}
    }
})
</script>

<style scoped>

</style>