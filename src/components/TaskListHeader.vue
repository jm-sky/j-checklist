<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  total: number
  totalDone: number
}>();

const progress = computed(() => !props.total ? 0 : Math.round(props.totalDone / props.total * 100));
</script>

<template>
  <div class="flex flex-col gap-2 p-4 border-theme rounded-lg bg-theme backdrop-blur-md shadow-lg">
    <div class="flex flex-row items-center justify-between gap-2">
      <div class="space-y-1">
        <div class="font-bold text-2xl">Tasks</div>
        <div class="font-semibold">You have something to do!</div>
      </div>
      <div class="size-20 font-bold p-1 text-lg rounded-full text-white grid place-items-center bg-primary/50 bg-gradient-to-b from-primary/75 to-primary-800/75 shadow">
        {{ progress }}%
      </div>
    </div>
    <progress :value="progress" :max="100" class="w-full mt-1 h-2" />
  </div>
</template>
