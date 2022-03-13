<template>
    <div>
        <div class="row">
            <div class="col">
                <q-input v-model="name" type="text" label="Name" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <q-input v-model="description" type="textarea" label="Description" />
            </div>
        </div>

        <div class="row q-pt-md">
            <div class="col-auto">
                <q-btn color="primary" icon="edit" label="Save device" />
            </div>
            <div class="col q-ml-sm">
                <q-btn color="red" icon="delete" label="Remove device" />
            </div>
        </div>


    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup () {
        
        const name = ref(null);
        const description = ref(null);
        ///const name = ref(null);

        return {name, description}
    }
})
</script>

<style scoped>

</style>