<template>

    <q-dialog v-model="show_dialog" full-width>
      <q-card >
        <q-card-section>
          <div class="text-h6">MQTT attributes map</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          
          <div class="row q-col-gutter-md">
            <div class="col-4">
              <q-table :columns="attr_columns" :rows="attributes" row-key="id" v-model:selected="selected_attr" selection="single"  ></q-table>
            </div>
            <div class="col-8 q-gutter-sm">
              <q-input v-model="path" label="Path" outlined placeholder="eg. /building1/room2/temp"></q-input>
              <q-btn label="Add" color="green" icon="add" @click="add_path" :disable="disable_add"></q-btn>
              <q-table :columns="map_columns" :rows="map">
                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <!-- <q-btn dense round flat color="grey" icon="edit"></q-btn> -->
                    <q-btn dense round flat color="red" icon="delete" @click="remove_path(props.row)"></q-btn>
                  </q-td>          
                </template>
              </q-table>
            </div>
          </div>


        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script lang="ts">
import { defineComponent, watch, ref, toRefs, reactive } from 'vue'
import device_store from "@store/device";
import { computed } from '@vue/reactivity';

export interface IExposeMqttMap{
    open_dialog(): void
}

interface MqttAttributeMap{
  name: string, path: string, attributeID: number[]
}

export default defineComponent({

    emits: ["update"],

    setup (props, context) {


        const show_dialog = ref(true);

        function open_dialog(){
            show_dialog.value = true;
        }

        const attr_columns = [
          {name: "name", label: "Attribute", field: "name",  align: "left"},
          {name: "type", label: "Type", field: "type"},
        ];
        const map_columns = [
          { name: "name",label: "Attribute", field: "name", align: "left"},
          { name: "path",label: "Path",field: "path", align: "left"},
          { name: "action",label: "Actions",field: "action", align: "right", sortable: false},
        ];

        const selected_attr = ref();
        const path = ref("");
        
        const map = ref<{name: string, path: string, attributeID: number}[]>([]);


        const disable_add = computed(()=>{
          return !(selected_attr.value && Object.keys(selected_attr.value).length);
        });

        const attribute_map = computed(()=>{
          return device_store.state.current_device?.ConnectionMQTT?.AttributeMQTTMap || [];
        });

        const attributes = computed(()=>{
          return device_store.state.current_device?.attributes || [];
        })


        watch(attribute_map, (value)=>{
          if(value){
            const data = value.map(row=>{
              return {
                name: attributes.value.find(f=> f.id == row.attributeID) || "",
                path: row.path,
                attributeID: row.attributeID
              }
            });
            console.log(data);
          }
        });



        function row_click(event:any, row: any, index: number ){
          selected_attr.value = row;
        }


        function add_path(){
          if(selected_attr.value && Object.keys(selected_attr.value).length && path.value.length){
            const selected = selected_attr.value[0];
            map.value.push({
              name: selected.name,
              attributeID: selected.id,
              path: path.value
            });

            context.emit("update", map);
          }
        }

        function remove_path(row:any){
          const idx = map.value.indexOf(row);
          map.value.splice(idx,1);
          context.emit("update", map);
        }





        context.expose({open_dialog});

        return {show_dialog, attr_columns, map_columns, attributes, selected_attr,  path, add_path, remove_path, row_click, disable_add, map}
    }
})
</script>

<style scoped>

</style>