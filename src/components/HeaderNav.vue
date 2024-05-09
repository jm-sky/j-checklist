<script setup lang="ts">
import FaRocket from '@/components/icons/FaRocket.vue';
</script>

<template>
  <header class="sticky top-0 flex flex-row items-center justify-between border-b border-primary-500/50 py-1 px-3 w-full bg-primary-900/50 backdrop-blur-md shadow-lg">
    <h1 class="font-bold text-xl">
      <FaRocket />
      CheckList
    </h1>
    <nav class="flex flex-row items-center justify-end gap-4">
      <RouterLink to="/" class="text-primary-300 hover:text-primary-100">Home</RouterLink>
      <RouterLink to="/about" class="text-primary-300 hover:text-primary-100">About</RouterLink>
    </nav>
  </header>
</template>
