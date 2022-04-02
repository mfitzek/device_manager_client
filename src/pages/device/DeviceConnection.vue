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
import { IConnection, IConnectionMQTT } from '@/types/device';

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
        const connection = reactive<IConnection>(device_store.state.current_device?.connection || {type: "http", mqtt: null});

        async function mqtt_update_connection(event: IConnectionMQTT){
            type.value = "mqtt";
            connection.type = "mqtt";
            connection.mqtt = event;

            device_store.update_connection({...connection});
        }
       
       onBeforeMount(()=>{
           type.value = connection.type;
       })

        return {type, options, connection, mqtt_update_connection}
    }
})
</script>

<style scoped>

</style>