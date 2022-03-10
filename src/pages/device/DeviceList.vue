<template>
    <div>
        <h1>Info</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        
        const columns = [
            {name: "name", field: "name", label: "Device"},
            {name: "connection", field: "connection", label: "Connection"},
        ]

        return {columns}
    }
})
</script>

<style scoped>

</style>