<template>
    <div>
        <q-select v-model="type" :options="options" label="Connection type" outlined emit-value map-options/>

        <mqtt-connection :connection="connection.mqtt" v-if="type=='mqtt'" @update="mqtt_update_connection" />

    

    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import MqttConnection from '@/components/device/mqtt/MqttConnection.vue';
import device_store from '@/store/device';
import { IConnection, IConnectionMQTT, IDeviceData } from '@/types/device';

export default defineComponent({

    components: {
        MqttConnection
    },

    setup () {
        
        const type = ref("");

        const options = [
            {label: "MQTT", value: "mqtt"},
            {label: "HTTP", value: "http"},
        ];
        const connection = ref<IConnection>(device_store.state.current_device?.connection || {type: "http", mqtt: null});

        async function mqtt_update_connection(event: IConnectionMQTT){
            connection.value.type = "mqtt";
            connection.value.mqtt = event;
            let data: IConnection = {...connection.value};
            device_store.update_connection(data);
        }

        


        watch(()=>device_store.state.current_device, (dev: IDeviceData | null)=>{
            type.value = dev?.connection.type ?? "http";
            if(dev){
                connection.value = {...dev.connection};
            }

        }, {immediate: true});
       

        return {type, options, connection, mqtt_update_connection}
    }
})
</script>

<style scoped>

</style>