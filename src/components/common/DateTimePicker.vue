<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input filled v-model="date" @update="update" :label="label" readonly >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm" @update:model-value="update">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h @update:model-value="update">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
        <q-icon v-if="date" name="cancel" @click.stop="remove" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">


function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes())
    ].join(':')
  );
}

import { defineComponent, ref, watch} from 'vue'

export default defineComponent({

    emits: ["update:modelValue"],
    props: {
        modelValue: {
            type: [Date],
        },
        label: String
    },

    setup (props, ctx) {
        
        const date = ref("");

        watch(()=>props.modelValue, (val)=>{
            if(val){
                date.value = formatDate(val);
            }else{
                date.value = ""
            }
        });

        function update(){
            if(date.value.length)
                ctx.emit("update:modelValue", new Date(date.value));
            else
                ctx.emit("update:modelValue", null);
        }

        function remove(){
            date.value = "";
            ctx.emit("update:modelValue", null);
        }

        return {date, update, remove}
    }
})
</script>

<style scoped>

</style>