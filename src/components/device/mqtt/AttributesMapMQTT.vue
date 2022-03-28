<template>

    <q-dialog v-model="show_dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script lang="ts">
import { defineComponent, watch, ref, toRefs } from 'vue'

export interface IExposeMqttMap{
    open_dialog(): void
}

export default defineComponent({

    setup (props, context) {


        const show_dialog = ref(false);

        function open_dialog(){
            show_dialog.value = true;
        }

        context.expose({open_dialog});

        return {show_dialog}
    }
})
</script>

<style scoped>

</style>