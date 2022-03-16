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
import  {Device} from "@store/device";

export default defineComponent({
    setup () {
        
        const name = ref("");
        const description = ref("");
        const location = ref("");


        watch(device_store.state, ({current_device})=>{
           set_data(current_device);
        });

        function set_data(device: any){
            name.value = device?.name ?? "";
            description.value = device?.description ?? "";
            location.value = device?.location ?? "";
        }


        async function update_device(){
            const data = {
                id: null,
                ...device_store.state.current_device,
                name: name.value,
                description: description.value,
                location: location.value
            };

            device_store.update_device(data.id, data);
            
        }


        onMounted(()=>{
            set_data(device_store.state.current_device);
        });


        async function  remove_device() {
            await device_store.remove_device(device_store.state.current_device!.id!);
            
        }



        return {name, description, location, update_device, remove_device}
    }
})
</script>

<style scoped>

</style>