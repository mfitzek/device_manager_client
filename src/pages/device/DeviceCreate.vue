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
                <q-btn color="primary" icon="add" label="Create device" @click="create_device" />
            </div>
        </div>


    </div>

</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import device_store from "@store/device";
import { useRouter } from 'vue-router';
import { IDeviceShort } from '@/types/device';
import auth from '@/store/auth';

export default defineComponent({
    setup () {
        
        const name = ref("");
        const description = ref("");
        const location = ref("");

        const router = useRouter();

        async function create_device(){

            const device: IDeviceShort = {
                ownerID: auth.state.user_id,
                name: name.value,
                description: description.value,
                location: location.value,
                connection: "http",
            }

            await device_store.create_device(device);
            router.push({name: "DeviceDetail"});

            
        }


        return {name, description, location, create_device}
    }
})
</script>

<style scoped>

</style>