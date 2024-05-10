<script setup lang="ts">
defineProps<{
  error?: boolean
}>();

const value = defineModel<string>('modelValue', { required: true });
</script>

<template>
  <input
    v-model="value"
    class="text-sm font-light rounded-lg px-3 py-2 bg-black/30 backdrop-blur-md"
    :class="error ? 'border-red-500/50' : 'border-theme'"
  />
</template>
