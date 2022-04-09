<template>
    <div class="">
        <div class="row">
            <div class="col col-md-6">
                <q-input v-model="name" type="text" label="Name" outlined/>
            </div>
        </div>
        <div class="row q-mt-md">
            <div class="col col-md-6">
                <q-input v-model="location" type="text" label="Location" outlined/>
            </div>
        </div>
        <div class="row q-mt-md">
            <div class="col col-md-6">
                <q-select v-model="type" label="Type" outlined map-options emit-value :options="type_options"/>
            </div>
        </div>
        <div class="row q-mt-md">
            <div class="col">
                <q-input v-model="description" type="textarea" label="Description" outlined/>
            </div>
        </div>

        <div class="row q-mt-md">
            <div class="col-auto">
                <q-btn color="primary" icon="edit" label="Update device" @click="update_device" />
            </div>
            <div class="col q-ml-sm">
                <q-btn color="red" icon="delete" label="Remove device" @click="remove_device" />
            </div>
        </div>


    </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import device_store from "@store/device";
import { IDeviceData, IDeviceShort } from '@/types/device';


export default defineComponent({
    setup () {
        
        const name = ref("");
        const description = ref("");
        const location = ref("");

        const type = ref(0);


        watch(device_store.state, ({current_device})=>{

            if(current_device){
                set_data(current_device);
            }

        }, {immediate: true});

        const type_options = device_store.DeviceTypeList.map((o, idx)=>{
            return {
                label: o,
                value: idx
            }
        })


        function set_data(device: IDeviceData){
            name.value = device.name;
            description.value = device.description?? "";
            location.value = device.location ?? "";
            type.value = device.type ?? 0;
        }


        async function update_device(){
            const data: IDeviceShort = {
                id: device_store.state.current_device?.id!,
                ownerID: device_store.state.current_device?.ownerID!,
                name: name.value,
                description: description.value,
                type: type.value,
                location: location.value,
                connection: device_store.state.current_device?.connection.type!
            };

            device_store.update_device(data.id!, data);
            
        }


        onMounted(()=>{
            //if(device_store.)
            //set_data(device_store.state.current_device);
        });


        async function  remove_device() {
            await device_store.remove_device(device_store.state.current_device!.id!);
            
        }



        return {name, description, location, update_device, remove_device, type, type_options}
    }
})
</script>

<style scoped>

</style>