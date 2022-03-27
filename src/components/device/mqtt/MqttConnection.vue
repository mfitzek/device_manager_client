<template>
    <div class="row q-mt-sm  q-gutter-x-sm">
        <div class="col">
            <q-input v-model="url" type="text" label="URL" required outlined />
        </div>
        <div class="col">
            <q-input v-model="client" type="text" label="Client ID" outlined />
        </div>
    </div>

    <div class="row q-mt-sm q-gutter-x-sm ">
        <div class="col">
            <q-input v-model="username" type="text" label="Username" outlined />
            </div>
        <div class="col">
            <q-input v-model="pass" type="password" label="Password" outlined arai />
            </div>
    </div>

    <q-table title="Map attributes" :columns="columns" :rows="rows">
        <template #top-right>
            <q-btn label="Edit" color="primary"></q-btn>
        </template>
    </q-table>

    <q-btn class="q-mt-sm" label="Update connection" color="primary" @click="update"></q-btn>
    <q-btn class="q-mt-sm q-ml-sm" label="Test connection" color="green"></q-btn>

</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from "vue";

export default defineComponent({
    setup(pros: {}, context: SetupContext) {
        const url = ref("");
        const client = ref("");
        const username = ref("");
        const pass = ref("");


        const columns = [
            { name: "path",label: "Path",field: "path", align: "left"},
            { name: "name",label: "Name",field: "name", align: "left"},
            { name: "type",label: "Type",field: "type"},
            ]

        const rows = [{
            path: "/home/room2/temp",
            name: "Temperature",
            type: "Number"
        }]

        function update(){
            context.emit("update", {
                url: url.value,
                clientID: client.value,
                username: username.value,
                password: pass.value,
                attributes_map: rows
            });
        }

        return { url, client, username, pass, columns, rows, update};
    },
});
</script>

<style scoped></style>
