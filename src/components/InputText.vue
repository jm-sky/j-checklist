<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  error?: boolean
}>();

const inputRef = ref<HTMLInputElement>();
const value = defineModel<string>('modelValue', { required: true });

const blur = () => inputRef.value?.blur?.();

defineExpose({
  blur,
});
</script>

<template>
  <input
    ref="inputRef"
    v-model="value"
    class="text-sm font-light rounded-lg px-3 py-2 bg-black/30 backdrop-blur-md"
    :class="error ? 'border-red-500/50' : 'border-theme'"
  >
</template>
