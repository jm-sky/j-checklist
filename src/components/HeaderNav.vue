<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <header class="sticky top-0 flex flex-row items-center justify-between border-b border-primary-500/50 py-1 px-3 w-full bg-theme backdrop-blur-md shadow-lg">
    <h1 class="font-bold text-xl opacity-75">
      <FontAwesomeIcon :icon="faTasks" />
      J-CheckList
    </h1>
    <nav class="flex flex-row items-center justify-end gap-4">
      <RouterLink to="/" class="text-primary-300 hover:text-primary-100">Home</RouterLink>
      <RouterLink to="/about" class="text-primary-300 hover:text-primary-100">About</RouterLink>
    </nav>
  </header>
</template>
