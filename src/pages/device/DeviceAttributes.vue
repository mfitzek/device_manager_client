<template>
    <div class="">
        <div class="row q-col-gutter-sm ">
            <div class="col-4">
                <q-input v-model="search" type="search" label="Search" outlined />
                <q-table class="q-mt-md" row-key="name" />
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-6">
                        <q-input v-model="name" type="text" label="Attribute name" outlined />
                    </div>
                </div>
                <div class="row q-mt-md">
                    <div class="col-6">
                        <q-select
                            v-model="selection"
                            :options="select_options"
                            label="Attribute type"
                            outlined
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 q-mt-md">
                        <q-input
                            v-model="description"
                            type="textarea"
                            label="Description"
                            outlined
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row q-mt-md q-col-gutter-sm">
            <div class="col-4">
                <q-btn color="primary" icon="add" label="Add attribute" />
            </div>
            <div class="col-8">
                <div>
                    <q-btn color="primary" icon="edit" label="Update" />
                    <q-btn class="q-ml-sm" color="red" icon="delete" label="Remove" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const search = ref(null);

        const name = ref(null);
        const selection = ref(null);
        const description = ref(null);

        const select_options = [
            { label: "Number", value: "number" },
            { label: "String", value: "string" },
            { label: "Object", value: "object" },
            { label: "Boolean", value: "bool" },
        ]


        return { search, name, description, selection, select_options }
    }
})
</script>

<style scoped>
</style>