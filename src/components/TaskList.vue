<script setup lang="ts">
import { ref } from 'vue';
import TaskListItem from './TaskListItem.vue';
import { Task} from '@/models/task.model';

const tasks = ref<Task[]>([
  Task.create({
    title: 'Wypić kawę',
  }),
]);
</script>

<template>
  <div>
    <TaskListItem  v-for="task in tasks" :key="task.id" :task />
  </div>
</template>
