<template>
    <div class="row q-mt-sm q-col-gutter-md" v-for="d of my_data">
        <div class="col">
            Device: {{ d.name }}
            <div class="row q-mb-sm">
                <div class="col">Attribute</div>
                <div class="col">Type</div>
                <div class="col">Collected</div>
                <div class="col">Last date</div>
                <div class="col">Last value</div>
            </div>
            <hr />
            <div class="row" v-for="a of d.attributes">
                <div class="col">{{ a.name }}</div>
                <div class="col">{{ a.type }}</div>
                <div class="col">{{ a.telemetry?.length }}</div>
                <div class="col">{{ last_value(a).date }}</div>
                <div class="col">{{ last_value(a).value }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { IAttribute, IDeviceAttributes } from "@/types/device";
import { computed } from "@vue/reactivity";
import { api } from "@/store/device";

export default defineComponent({
    props: {
        data: Object as PropType<IDeviceAttributes[]>,
    },
    setup(props) {
       

        const my_data = computed(() => {
            return props.data?.filter((d) => d.attributes.length);
        });

        function last_value(attr: IAttribute) {
            if (attr.telemetry?.length) {
                const last = attr.telemetry[attr.telemetry.length - 1];
                return {
                    date: last.createdAt?.toLocaleString(),
                    value: last.value,
                };
            }
            return {
                date: "NA",
                value: "NA",
            };
        }

        return {  my_data, last_value };
    },
});
</script>

<style scoped></style>
