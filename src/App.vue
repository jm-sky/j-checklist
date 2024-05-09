<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderNav from '@/components/HeaderNav.vue';
</script>

<template>
  <HeaderNav />

  <div class="w-full max-w-2xl mx-auto p-4">
    <RouterView />
  </div>
</template>
