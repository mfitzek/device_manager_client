<template>
    <div>
        <q-select v-model="type" :options="options" label="Connection type" outlined />
        <q-input v-model="con_string" type="text" label="Connection string" />


    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup () {
        
        const type = ref(null);
        const con_string = ref(null);

        const options = [
            {label: "MQTT", value: "mqtt"},
            {label: "HTTP", value: "http"},
            {label: "CoAP", value: "coap"},
        ]

        

        return {type, con_string, options}
    }
})
</script>

<style scoped>

</style>