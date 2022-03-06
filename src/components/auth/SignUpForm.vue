<template>
    <q-form @submit="signup" ref="myForm" class="signup-form">
        <q-input
            v-model="username"
            name="username"
            autocomplete="username"
            label="Username"
            :rules="[(val) => (val && val.length > 0) || 'Username is required', existing_username]"
        ></q-input>
        <q-input
            v-model="email"
            name="email"
            label="Email"
            type="email"
            autocomplete="email"
            :rules="[(val) => (val && val.length > 0) || 'Email is required', existing_email]"
        ></q-input>
        <q-input
            v-model="password"
            name="new-password"
            label="Password"
            autocomplete="new-password"
            type="password"
            :rules="[(val) => (val && val.length > 0) || 'Password is required']"
        ></q-input>

        <q-input v-model="password_confirm" name="confirm-password" autocomplete="new-password" label="Confirm password" type="password" :rules="[password_confirmation]"></q-input>

        <div class="q-mt-lg row justify-between">
            <q-btn class="col-12" label="Sign up" type="submit" color="primary"></q-btn>
        </div>
    </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { QForm } from "quasar";
import api from "@service/axios_api";
import { AxiosError } from "axios";

export default defineComponent({

    emits: ["signUp"],

    setup(_, ctx) {
        const myForm = ref<QForm | null>(null);

        const username = ref(null);
        const email = ref(null);
        const password_confirm = ref(null);
        const password = ref(null);

        let first = true;

        let email_errors = false;
        let username_errors = false;

        function existing_email() {
            if (first) return true;
            return !email_errors || "Email is already used";
        }

        function existing_username() {
            if (first) return true;
            return !username_errors || "Username is already used";
        }

        function password_confirmation() {
            return !password.value || password.value == password_confirm.value || "Passwords must match";
        }

        async function signup() {
          first = false;
            let valid = false;
            if(myForm.value){
              valid = await myForm.value.validate();
            }

            if (valid) {
                const data = { username: username.value, email: email.value, password: password.value };
                try {
                    const resp = await api.post("/auth/signup", data);
                    console.log(resp.data);
                    //TODO: Toast message Success
                    ctx.emit("signUp", resp.data);
                    
                } catch (error: any) {
                    if(error.response?.data?.errors){
                        console.log(error.response.data);
                        for(let err of error.response.data.errors){
                            if(err.property == "email"){

                            }
                        }
                    }
                }
            }
        }

        return { myForm, username, password, email, password_confirm, existing_email, existing_username, signup, password_confirmation };
    },
});
</script>

<style scoped>
.signup-form {
    min-width: 375px;
}
</style>
