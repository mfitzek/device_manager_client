<template>
    <div class="">
        <div class="row q-col-gutter-sm ">
            <div class="col-3">
                <q-input v-model="search" type="search" label="Search" outlined />
                <q-table class="q-mt-md" row-key="name" :columns="table_columns" :rows="attributes" @row-click="row_click"/>
            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col-6">
                        <q-input v-model="name" type="text" label="Attribute name" outlined :rules="[unique_name]"/>
                    </div>
                </div>
                <div class="row q-mt-md">
                    <div class="col-6">
                        <q-select
                            v-model="selection"
                            :options="select_options"
                            label="Attribute type"
                            outlined
                            emit-value
                            map-options
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row q-mt-md q-col-gutter-sm">
            <div class="col-3">
                <q-btn color="primary" icon="add" label="New attribute" @click="add_click" />
            </div>
            <div class="col-9">
                <div>
                    <q-btn color="primary" icon="edit" :label="new_attr? 'Add':'Update'" @click="update_click" />
                    <q-btn class="q-ml-sm" color="red" icon="delete" label="Remove" v-if="!new_attr" @click="delete_click"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref,watch} from 'vue';

import device_store from "@store/device";
import { AttributeType, IAttribute } from '@/types/device';


export default defineComponent({
    setup() {
        const search = ref("");

        const name = ref("");
        const selection = ref<AttributeType>("string");

        let selected: IAttribute | null = null;
        let new_attr = ref(true);
        

        const attributes = computed(() => {
            return device_store.state.current_device?.attributes;
        });


        watch(()=>device_store.state.current_device, (dev)=>{
            selected = null;
            new_attr.value = true;
        }, {immediate: true})

        function unique_name(name: string){
            let find = attributes.value?.find(a=>a.name == name);
            if(find && find != selected){
                return "Attribute name must be unique";
            }
            return true;
        }



        const table_columns = [
            {name: "name", field: "name", label: "Name", align: "left" },
            {name: "type", field: "type", label: "Type" },
            ]

        const select_options = [
            { label: "Number", value: "number" },
            { label: "String", value: "string" },
            { label: "Object", value: "object" },
        ];

        function row_click(ev:any, row:any, index:any){
            selected = row;
            name.value = row.name;
            selection.value = row.type;
            new_attr.value= false;
        }


        function add_click(){
            new_attr.value = true;
            name.value = "";
            selection.value = "string";
        }


        function update_click(){
            if(unique_name(name.value) !== true){
                return;
            }

            if(new_attr.value == true){

                let attribute: IAttribute = {
                    name: name.value,
                    type: selection.value,
                }
                
                device_store.add_attribute(attribute);

            }else{
                let attribute: IAttribute = {
                    id: selected!.id,
                    name: name.value,
                    type:selection.value,
                }

                device_store.update_attribute(attribute);

            }
        }

        function delete_click(){
            let attr_id = selected!.id!;
            device_store.delete_attribute(attr_id);
            selected = null;
            new_attr.value = true;
            name.value = "";
        }


        return { search, name, selection, select_options, attributes, table_columns, new_attr, delete_click, row_click, add_click, update_click, unique_name }
    }
})
</script>

<style scoped>
</style>