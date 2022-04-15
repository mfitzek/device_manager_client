<template>
    <div class="container">
        <div class="row q-col-gutter-sm q-mt-sm">
            <div class="col-6">
                <q-input type="text" label="Access token" outlined readonly :model-value="token">
                    <template v-slot:append>
                        <q-btn round dense flat icon="content_copy" @click="clipboard_copy" />
                    </template>
                </q-input>
            </div>
            <div class="col q-mt-md">
                <q-btn label="Refresh token" color="primary" icon-right="refresh" @click="refresh"></q-btn>
            </div>
        </div>
        <div class="row q-col-gutter-sm q-mt-sm">
            <div class="col">
                <p>
                    To send data via HTTP send POST request to <br>
                    POST localhost:3000/telemetry/{{device.id}} <br>
                    set header <br>
                    "access_token"={{token}} <br>
                    and body with name of parameters eg.<br>
                    temp=24.6&hum=45.5 <br>
                    or send attributes in JSON format <br>
                    <code>
                        {  
                            "temp": 24.6,
                            "hum": 33.4
                        }
                    </code>

                </p>
            </div>
        </div>
        <div class="row q-col-gutter-sm q-mt-sm">
            <div class="col">
                <q-btn label="Update connection" @click="update_connection" color="primary"></q-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import device_store, {api} from "@/store/device";
import { computed } from "@vue/reactivity";

export default defineComponent({
    emits: ["update"],
    setup(props, ctx) {

        const device = computed(()=>{
            return device_store.state.current_device;
        });
        //const device = ref(device_store.state.current_device);

        const token = computed(()=>{
            return device.value?.connection?.http?.access_token ?? "";
        });

        function update_connection() {
            ctx.emit("update");
        }

        function clipboard_copy() {
            if (token.value.length) {
                navigator.clipboard.writeText(token.value);
            }
        }

        async function refresh(){
            await api.post(`device/${device.value?.id}/connection/http/refresh`);
            await device_store.fetch_device(device.value?.id!);
        }

        return { update_connection, device, token, clipboard_copy, refresh };
    },
});
</script>

<style scoped></style>
