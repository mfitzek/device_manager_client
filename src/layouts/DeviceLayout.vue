<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-3">
                    <q-input v-model="search" type="search" label="Search" outlined >
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
            </div>
            <div class="col-9">
                <q-toolbar color="primary">
                    <q-tabs v-model="tab" class="text-primary">
                        <q-tab name="device" icon="fas fa-microchip" label="Device" :disable="!selected_device"/>
                        <q-tab name="attributes" icon="feed" label="Attributes" :disable="!selected_device"/>
                        <q-tab name="connection" icon="cable" label="Connection" :disable="!selected_device"/>
                        <q-tab name="data" icon="fas fa-database" label="Data" :disable="!selected_device"/>
                    </q-tabs>
                    <q-space />
                    <q-tabs v-model="tab" class="text-primary">
                        <q-tab name="add" icon="add" label="Add device" />
                    </q-tabs>
                </q-toolbar>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <q-table :columns="columns" :rows="data" @row-click="row_click"></q-table>
            </div>
            <div class="col-9">
                <q-card class="q-ml-md q-pa-md">
                    <router-view></router-view>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";

import device_store from "@store/device";
import AxiosApi from "@/service/axios_api";
import { IDeviceShort } from "@/types/device";


const api = AxiosApi.getInstance().api;

export default defineComponent({
    setup() {
        const router = useRouter();
        const tab = ref("device");
        const search = ref(null);


        const selected_device = computed(()=>{
            return device_store.state.current_device;
        });

        const columns = [
            { name: "name", field: "name", label: "Device", align: "left" },
            { name: "connection", field: "connection", label: "Connection" },
        ];

        watch(tab, (value)=>{
            switch(value){
                case "device": router.push({name: "DeviceDetail"}); break;
                case "attributes": router.push({name: "DeviceAttributes"}); break;
                case "connection": router.push({name: "DeviceConnection"}); break;
                case "add": router.push({name: "DeviceCreate"}); break;
            }
        });

        watch(selected_device, (value)=>{
            if(!value){
                tab.value =  "add";
               // router.push({name: "DeviceCreate"});
            }
        });


        async function row_click(item:any, row: any, index: Number){

            await device_store.fetch_device(row.id);
            
            if(tab.value == "add"){
                tab.value = "detail";
                router.push({name: "DeviceDetail"});
            }
        }

        const data = computed(()=>{
            return device_store.state.device_list.map((dev: IDeviceShort) =>{
                    return {
                        id: dev.id,
                        name: dev.name,
                        connection: dev.connection
                    }
                });
        });


        onBeforeMount(async ()=>{
            tab.value = "add";
            await device_store.fetch_device_list();
            
        });


        return { tab, search, columns, data , row_click, selected_device};
    },
});
</script>

<style scoped></style>
