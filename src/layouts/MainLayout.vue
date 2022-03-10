<template>
  <q-layout view="hHh lpR lFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <ToolbarUser></ToolbarUser>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-list>
        <q-item clickable>
          <q-item-section>Device</q-item-section>
          <q-item-section avatar>
            <q-icon name="fas fa-microchip"></q-icon>
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

export default defineComponent({
  name: 'MainLayout',

  components: {
    ToolbarUser
  },

  setup () {
    const leftDrawerOpen = ref(false);

    function toggleLeftDrawer(){
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer
    }
    }
})
</script>
