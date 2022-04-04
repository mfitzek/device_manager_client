

<template>
    <div>



        <q-btn label="Update connection" @click="update_connection"></q-btn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ["update"],
    setup (props, ctx) {
        
        function update_connection(){
            ctx.emit("update");
        }

        return {update_connection}
    }
})
</script>

<style scoped>

</style>