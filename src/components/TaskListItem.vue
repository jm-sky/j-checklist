<script setup lang="ts">
import { faCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { Task } from '@/models/task.model';

const task = defineModel<Task>('task', { required: true });

const emit = defineEmits<{
  delete: []
}>();

const toggle = () => {
  task.value.doneDate = task.value.isDone ? null : new Date();
};
</script>

<template>
  <div class="flex flex-row gap-2 items-center justify-between border border-primary-500/50 px-3 py-2 rounded-lg bg-primary-800/40 shadow-lg">
    <div :class="{ 'line-through': task.isDone }">
      {{ task.title }}
    </div>
    <div class="flex flex-row gap-3 text-sm items-center">
      <button class="cursor-pointer" @click="toggle()">
        <FontAwesomeIcon v-if="task.isDone" :icon="faCheck" />
        <FontAwesomeIcon v-else :icon="faCircle" />
      </button>
      <button class="cursor-pointer" @click="emit('delete')">
        <FontAwesomeIcon :icon="faTimes" />
      </button>
    </div>
  </div>
</template>
