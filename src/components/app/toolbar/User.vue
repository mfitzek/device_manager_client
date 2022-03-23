<template>
    <template v-if="is_auth()">
        <q-btn flat>
            {{username}}
            <q-avatar>
            <q-icon name="account_circle" size="lg"></q-icon>
        </q-avatar>

        <q-menu id="user_menu" fit>
            <q-list class="text-center">
                <q-item>
                    <q-item-section>{{email}}</q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>{{username}}</q-item-section>
                </q-item>
                <q-separator></q-separator>
                <q-item clickable>
                    <q-item-section>Account</q-item-section>
                </q-item>
                <q-separator></q-separator>
                <q-item clickable>
                    <q-item-section @click="logout">Logout</q-item-section>
                </q-item>

            </q-list>
        </q-menu>
        
        </q-btn>

    </template>
    <template v-else>
        <q-btn stretch flat @click="link_login">Log in</q-btn>
        <q-btn stretch flat @click="link_signup">Sign up</q-btn>
    </template>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import  auth_store  from "@/store/auth";
import { useRouter } from "vue-router";

function links() {
    const router = useRouter();
    function link_login() {
        router.push({ name: "Login" });
    }

    function link_signup() {
        router.push({ name: "SignUp" });
    }
    return { link_login, link_signup };
}

export default defineComponent({
    setup() {
       
        const username = computed(()=>{
            return auth_store.state.username?? "#";
        });

        const email = computed(()=>{
            return auth_store.state.email?? "#"
        });

        function logout(){
            auth_store.logout();
        }


        return { is_auth: auth_store.is_authenticated, ...links(), username, email, logout};
    },
});
</script>

<style scoped>
#user_menu{
    min-width: 250px;
}
</style>
