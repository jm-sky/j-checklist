<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStorage, useSorted } from '@vueuse/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TaskListItem from './TaskListItem.vue';
import DateButton from './DateButton.vue';
import { Task, taskSerializer, type ITaskInitData } from '@/models/task.model';

const tasks = useStorage<Task[]>('tasks', [], localStorage, { serializer: taskSerializer });

const newTask = ref<ITaskInitData>({
  title: 'Drink some coffee',
  dueDate: null,
});

const onSubmit = () => {
  tasks.value.unshift(Task.create({
    ...newTask.value,
    dueDate: newTask.value.dueDate,
  }));
  newTask.value.title = 'Drink more coffee';
  newTask.value.dueDate = null;
};

const tasksSorted = useSorted(tasks, (a, b): number => (a.isDone ? 1 : 0) - (b.isDone ? 1 : 0));
const tasksDone = computed(() => tasks.value.filter(task => task.isDone));

const progress = computed(() => !tasks.value.length ? 0 : Math.round(tasksDone.value.length / tasks.value.length * 100));
</script>

<template>
  <div class="task-list flex flex-col gap-4">
    <div class="flex flex-col gap-2 p-4 border border-primary/50 rounded-lg bg-primary-900/50 backdrop-blur-md shadow-lg">
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

    <form class="sticky top-10 flex flex-row items-stretch gap-2" @submit.prevent="onSubmit()">
      <input v-model="newTask.title" placeholder="Write something here..." class="text-sm w-full font-light rounded-lg px-3 py-2 bg-primary-950/50 border-primary/50" />
      <DateButton v-model="newTask.dueDate" />
      <button
        :disabled="!newTask?.title.length"
        class="flex items-center justify-center aspect-square p-3 rounded-lg font-bold text-sm cursor-pointer bg-primary/50 hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon :icon="faPlus" fixed-width />
      </button>
    </form>

    <div v-if="!tasksSorted?.length" class="p-5 border border-gray-400/50 bg-black/15 rounded-lg font-light text-sm opacity-75">You have no tasks...</div>

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
