<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderNav from '@/components/HeaderNav.vue';
</script>

<template>
  <HeaderNav />

  <div class="w-full max-w-2xl mx-auto p-4 relative">
    <RouterView v-slot="{ Component }">
      <Transition
        enter-from-class="opacity-0 -translate-x-full"
        enter-active-class="transition-opacity -z-1 duration-500 w-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-from-class="opacity-100 translate-x-0"
        leave-active-class="transition-all absolute translate-x-0 duration-500 w-full"
        leave-to-class="opacity-0 translate-x-full"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>
