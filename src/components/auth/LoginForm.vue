<template>
    <q-form @submit="login" class="login-form">
        <q-input v-model="email" required name="email" autocomplete="email" label="Email" :rules="[(val) => (val && val.length > 0) || 'Email is required']"></q-input>
        <q-input
            v-model="password"
            required
            name="password"
            autocomplete="password"
            lazy-rules
            label="Password"
            type="password"
            :rules="[(val) => (val && val.length > 0) || 'Password is required', verify]"
        ></q-input>

        <div class="q-mt-lg row justify-between">
            <q-btn class="col-12" label="Log in" type="submit" color="primary"></q-btn>
        </div>
    </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { inject } from "vue";
import {auth_store} from "@store/auth";


export default defineComponent({
    setup() {
        const email = ref(null);
        const password = ref(null);

        const auth = inject<auth_store>("auth");

        let first = true;
        let verified = false;

        function verify() {
            if (first) return true;

            return verified || "Wrong email or password";
        }

        async function login() {
            verified = await auth.login(email.value, password.value);
            first = false;
            console.log(auth.is_authenticated());
        }

        return { email, password, login, verify };
    },
});
</script>

<style scoped>
.login-form {
    min-width: 375px;
}
</style>
