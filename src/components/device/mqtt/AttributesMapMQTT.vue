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
              <q-table :columns="map_columns" :rows="rows">
                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <!-- <q-btn dense round flat color="grey" icon="edit"></q-btn> -->
                    <q-btn dense round flat color="red" icon="delete" @click="remove_path(props.rowIndex)"></q-btn>
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
import { defineComponent, watch, ref, toRefs, reactive, onMounted } from 'vue'
import device_store from "@store/device";
import { computed } from '@vue/reactivity';
import { IAttributesMapMQTT } from '@/types/device';

export interface IExposeMqttMap{
    open_dialog(): void
}

interface MqttAttributeMap{
  name: string, path: string, attributeID: number[]
}

export default defineComponent({

    emits: ["update"],

    props: {
      map: Array
    },

    setup (props, context) {


        const show_dialog = ref(false);

        function open_dialog(){
            show_dialog.value = true;
        }

        const attributes_map = computed(()=>{
          return props.map as IAttributesMapMQTT[];
        });

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

        const disable_add = computed(()=>{
          return !(selected_attr.value && Object.keys(selected_attr.value).length);
        });


        const attributes = computed(()=>{
          return device_store.state.current_device?.attributes || [];
        })


        const rows = computed(()=>{
          return attributes_map.value.map(m_row=>{
              const attr = device_store.state.current_device!.attributes?.find(a=> a.id == m_row.attributeID);
              return {
                  id: m_row.id,
                  name: attr!.name,
                  path: m_row.path,
                  attributeID: m_row.attributeID
              }
            }) || [];
        });

        function row_click(event:any, row: any, index: number ){
          selected_attr.value = row;
        }


        function add_path(){
          if(selected_attr.value && Object.keys(selected_attr.value).length && path.value.length){
            const selected = selected_attr.value[0];
            
            let data: IAttributesMapMQTT[] = [
              ...attributes_map.value,
              {
                attributeID: selected.id,
                path: path.value
              }
            ]

            context.emit("update", data);
          }
        }

        function remove_path(row: number){
          let copy = [...attributes_map.value];
          copy.splice(row, 1);
          context.emit("update", copy);
        }




        context.expose({open_dialog});

        return {show_dialog, attr_columns, map_columns, attributes, selected_attr,  path, add_path, remove_path, row_click, disable_add, rows}
    }
})
</script>

<style scoped>

</style>