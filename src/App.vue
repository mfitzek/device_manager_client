<template>
  <router-view></router-view>
</template>


<script setup lang="ts">
  import { provide } from 'vue';
  import auth from '@store/auth';

  provide("auth", auth);

</script>

<style>

</style>
