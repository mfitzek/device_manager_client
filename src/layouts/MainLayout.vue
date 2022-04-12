<template>
  <q-layout view="hHh lpR lFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          SDD Store
        </q-toolbar-title>
 
        <ToolbarUser></ToolbarUser>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-list>
        <q-item v-for="(link, index) in links" :key="index" clickable @click="link.click">
          <q-item-section>{{link.name}}</q-item-section>
          <q-item-section avatar>
            <q-icon :name="link.icon"></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">

import ToolbarUser from "@components/app/toolbar/User.vue";
import { defineComponent, ref } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'MainLayout',

  components: {
    ToolbarUser
  },

  setup () {
    const leftDrawerOpen = ref(false);

    const router = useRouter();

    const links = [
      {name: "Device", icon: "fas fa-microchip", click: ()=> router.push({name: "DeviceDetail"})},
      {name: "Data", icon: "fas fa-database", click: ()=> router.push({name: "DataMain"})},
      {name: "Settings", icon: "settings", click: ()=> router.push({name: "DatabaseSettings"})},
    ]
    

    function toggleLeftDrawer(){
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      links
    }
    }
})
</script>
