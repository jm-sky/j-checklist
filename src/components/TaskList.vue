<script setup lang="ts">
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { computed, ref } from 'vue';
import { useStorage, useSorted } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TaskListItem from './TaskListItem.vue';
import { Task, taskSerializer, type ITaskInitData } from '@/models/task.model';

const tasks = useStorage<Task[]>('tasks', [], localStorage, { serializer: taskSerializer });

const newTask = ref<ITaskInitData>({
  title: '',
});

const onSubmit = () => {
  tasks.value.unshift(Task.create({...newTask.value}));
  newTask.value.title = '';
};

const tasksSorted = useSorted(tasks, (a, b): number => (a.isDone ? 1 : 0) - (b.isDone ? 1 : 0));
const tasksDone = computed(() => tasks.value.filter(task => task.isDone));

const progress = computed(() => Math.round(tasksDone.value.length / tasks.value.length * 100));
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

    <form class="flex flex-row items-center gap-2" @submit.prevent="onSubmit()">
      <input v-model="newTask.title" placeholder="Write something here..." class="text-sm w-full font-light rounded-lg px-3 py-2 bg-primary-950/50 border-primary/50" />
      <button class="flex items-center aspect-square p-3 bg-primary/50 hover:opacity-75 rounded-lg font-bold text-sm cursor-pointer">
        <FontAwesomeIcon :icon="faPlus" />
      </button>
    </form>

    <div class="flex flex-col gap-2">
      <TransitionGroup
        enter-from-class="absolute translate-x-4 opacity-0"
        enter-active-class="transform-gpu transition-all"
        leave-to-class="-translate-x-4 opacity-0"
        leave-active-class="absolute transform-gpu transition-all"
      >
        <TaskListItem
          v-for="(task, index) in tasksSorted"
          :key="task.id"
          v-model:task="tasks[index]"
          @delete="tasks.splice(index, 1)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
