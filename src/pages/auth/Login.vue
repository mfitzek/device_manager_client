<template>
    <q-page padding class="row justify-center">
        <div class="login_form col-auto">
            <h4>Log in</h4>
            <login-form></login-form>
            <div>
                <a href="">Create new account</a>
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@components/auth/LoginForm.vue";

export default defineComponent({
    components: {
        LoginForm,
    },
    setup() {
        return {};
    },
});
</script>

<style scoped>
.login_form {
    min-width: 400px;
}
</style>
