<template>

    <q-form autocomplete="false">
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
                <q-input v-model="pass" type="password" label="Password" outlined />
                </div>
        </div>
    </q-form>

    <q-table title="Map attributes" :columns="columns" :rows="rows">
        <template #top-right>
            <q-btn label="Edit" color="primary" @click="editMap"></q-btn>
        </template>
    </q-table>

    <q-btn class="q-mt-sm" label="Update connection" color="primary" @click="update"></q-btn>
    <!-- <q-btn class="q-mt-sm q-ml-sm" label="Test connection" color="green" disable></q-btn> -->

    <AttributeMapDialog :map="attributes_map" ref="edit_dialog" @update="map_updated" />

</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, onBeforeMount, onMounted, ref, SetupContext, reactive } from "vue";

import AttributeMapDialog, {IExposeMqttMap} from "./AttributesMapMQTT.vue";
import device_store from "@store/device";
import { IConnectionMQTT, IAttributesMapMQTT } from "@/types/device";

export default defineComponent({
    
    props: {
        connection: Object
    },

    components: {
        AttributeMapDialog
    },

    emits: ["update"],

    setup(props, context: SetupContext) {
        const url = ref("");
        const client = ref("");
        const username = ref("");
        const pass = ref("");


        const columns = [
            { name: "name",label: "Attribute",field: "name", align: "left"},
            { name: "path",label: "Path",field: "path", align: "left"},
            { name: "type",label: "Type",field: "type"},
            ]

        const connection = computed<IConnectionMQTT>(()=>{
            return props.connection as IConnectionMQTT;
        });

        let attributes_map = reactive<IAttributesMapMQTT[]>([]);


        const rows = computed(()=>{
            return attributes_map.map(m_row=>{
                const attr = device_store.state.current_device!.attributes?.find(a=> a.id == m_row.attributeID);
                return {
                    path: m_row.path,
                    name: attr?.name,
                    type: attr?.type
                }
            }) || [];
        })

        function update(){
            context.emit("update", {
                url: url.value,
                clientID: client.value,
                username: username.value,
                password: pass.value,
                attributes_map: attributes_map.map(obj => { return {...obj}})
            });
        }

        const edit_dialog = ref<IExposeMqttMap | null>(null);

        function editMap(){
            edit_dialog.value?.open_dialog();
        }

        function map_updated(data: IAttributesMapMQTT[]){
            attributes_map.splice(0);
            for(let m of data){
                attributes_map.push(m);
            }

        }

        onMounted(()=>{
            url.value = connection.value.url;
            client.value = connection.value.clientID;
            username.value = connection.value.username?? "";
            pass.value = connection.value.password?? "";


            for(let m of connection.value.attributes_map){
                attributes_map.push(m);
            }

        })

        return { url, client, username, pass, columns, rows, update, editMap, edit_dialog, attributes_map, map_updated};
    },
});
</script>

<style scoped></style>
