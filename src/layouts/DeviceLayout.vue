<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-4">
                <q-input v-model="search" type="text" label="Search" />
            </div>
            <div class="col-8">
                <q-toolbar color="primary">
                    <q-tabs v-model="tab" class="text-primary">
                        <q-tab name="device" icon="fas fa-microchip" label="Device" />
                        <q-tab name="attributes" icon="feed" label="Attributes" />
                        <q-tab name="connection" icon="cable" label="Connection" />
                        <q-tab name="data" icon="fas fa-database" label="Data" />
                    </q-tabs>
                </q-toolbar>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <q-table :columns="columns" :rows="data"></q-table>
            </div>
            <div class="col-8">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const tab = ref("device");
        const search = ref(null);

        const columns = [
            { name: "name", field: "name", label: "Device", align: "left" },
            { name: "connection", field: "connection", label: "Connection" },
        ];

        const data = [
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
            { name: "test", connection: "MQTT" },
        ];

        return { tab, search, columns, data };
    },
});
</script>

<style scoped></style>
