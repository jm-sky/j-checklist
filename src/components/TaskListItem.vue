<script setup lang="ts">
import type { Task } from '@/models/task.model';

defineProps<{
  task: Task,
}>();
</script>

<template>
  <div>
    {{ task.title }}
  </div>
</template>
