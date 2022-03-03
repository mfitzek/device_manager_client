<template>
    <q-form @submit="login">
        <q-input v-model="username" label="Username or Email" :rules="[(val) => (val && val.length > 0) || 'Username is required']"></q-input>
        <q-input v-model="password" lazy-rules label="Password" type="password" :rules="[(val) => (val && val.length > 0) || 'Password is required', verify]"></q-input>

        <div class="row justify-between">
            <q-btn class="col-12 col-md-auto" label="Log in" type="submit" color="primary"></q-btn>
        </div>
    </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const username = ref(null);
        const password = ref(null);

        let first = true;
        let verified = false;

        function verify() {
            if (first) return true;

            return verified || "Wrong username or password";
        }

        async function login() {
            console.log("Login with name", username.value);
            //TODO: LOGIN

            first = false;
        }

        return { username, password, login, verify };
    },
});
</script>

<style scoped>

</style>
