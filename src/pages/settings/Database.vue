<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col">
                <h4>Backup</h4>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <q-btn color="primary">Backup database</q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <q-file filled bottom-slots v-model="file" label="Label" counter accept=".zip">
                    <template v-slot:prepend>
                        <q-icon name="cloud_upload" @click.stop />
                    </template>
                    <template v-slot:append>
                        <q-icon name="close" @click.stop="file = null" class="cursor-pointer" />
                    </template>
                </q-file>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref} from "vue";

export default defineComponent({
    setup() {
        
        const file = ref(null);

        return {file};
    },
});
</script>

<style scoped></style>
