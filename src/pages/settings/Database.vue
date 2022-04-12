<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col">
                <h4>Backup</h4>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p class="text-h5">Create backup</p>
                <q-btn icon="cloud_download" color="green" label="Download backup" @click="backup"></q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p class="text-h5">Restore database</p>
                <div class="row">
                    <div class="col-6 col-lg-3">
                        <q-file filled bottom-slots v-model="file" label="Label" counter accept=".zip">
                            <template v-slot:prepend>
                                <q-icon name="cloud_upload" @click.stop />
                            </template>
                            <template v-slot:append>
                                <q-icon name="close" @click.stop="file = null" class="cursor-pointer" />
                            </template>
                        </q-file>
                    </div>
                    <div class="col q-ma-sm">
                        <q-btn color="primary" label="Restore database" @click="restore"></q-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AxiosApi from "@/service/axios_api";
import device_store from "@/store/device";
const api = AxiosApi.getInstance().api;

export default defineComponent({
    setup() {
        const file = ref(null);

        async function restore() {
            if (file.value) {
                let form = new FormData();
                form.append("backup", file.value);
                try {
                    await api.post("/settings/restore", form);
                    // this.$store.dispatch("user_settings/fetch");
                    // this.$store.commit("app/Push", { message: "Databáze úspěšně obnovena", type: "success" });
                    await device_store.fetch_device_list();
                } catch (error) {
                    // this.$store.commit("app/Push", {
                    //     message: "Chyba při obnovování dat.",
                    //     type: "error",
                    // });
                    console.log(error);
                }
            }
        }

        async function backup() {
            const res = await api.post("/settings/backup", null, { responseType: "blob" });
            const filename = res.headers["content-disposition"].split("=")[1];

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        return { file, restore, backup };
    },
});
</script>

<style scoped></style>
