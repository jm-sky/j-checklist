<script setup lang="ts">
import { computed } from 'vue';
import { useStorage, useSorted } from '@vueuse/core';
import TaskListHeader from './TaskListHeader.vue';
import TaskListItem from './TaskListItem.vue';
import TaskListForm from './TaskListForm.vue';
import { Task, taskSerializer } from '@/models/task.model';

const tasks = useStorage<Task[]>('tasks', [], localStorage, { serializer: taskSerializer });

const tasksSorted = useSorted(tasks, (a, b): number => (a.isDone ? 1 : 0) - (b.isDone ? 1 : 0));
const tasksDone = computed<Task[]>(() => tasks.value.filter(task => task.isDone));
</script>

<template>
  <div class="task-list flex flex-col gap-4">
    <TaskListHeader
      :total="tasks.length"
      :total-done="tasksDone.length"
    />

    <TaskListForm v-model:tasks="tasks" />

    <div
      v-if="!tasksSorted?.length"
      class="p-5 border border-gray-400/50 bg-black/15 rounded-lg font-light text-sm opacity-75"
    >
      You have no tasks...
    </div>

    <TransitionGroup
      enter-active-class="transform-gpu"
      enter-from-class="opacity-0 -translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="absolute transform-gpu"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
      tag="div"
      class="flex flex-col gap-3"
    >
      <TaskListItem
        v-for="(task, index) in tasks"
        :key="task.id"
        v-model:task="tasks[index]"
        class="transition-all duration-500"
        @delete="tasks.splice(index, 1)"
      />
    </TransitionGroup>
  </div>
</template>
