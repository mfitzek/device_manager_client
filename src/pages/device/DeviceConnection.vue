<template>
    <div>
        <q-select v-model="type" :options="options" label="Connection type" outlined emit-value map-options/>

        <mqtt-connection v-if="type=='mqtt'" @update="update_connection" />

    

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import MqttConnection from '@/components/device/mqtt/MqttConnection.vue';
import device_store from '@/store/device';

export default defineComponent({

    components: {
        MqttConnection
    },

    setup () {
        
        const type = ref("");

        const mqtt = ref(null);

        const options = [
            {label: "MQTT", value: "mqtt"},
            {label: "HTTP", value: "http"},
        ];

        const device =  computed(()=>{
            return device_store.state.current_device;
        });

        watch(device, (dev)=>{
            type.value = dev?.connection || "";
        });




        async function update_connection(event: any){
            console.log(event);
        }
       

        return {type, options, mqtt, update_connection}
    }
})
</script>

<style scoped>

</style>