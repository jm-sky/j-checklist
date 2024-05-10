<script setup lang="ts">
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import DateButton from './DateButton.vue';
import InputText from './InputText.vue';
import { Task, type ITaskInitData } from '@/models/task.model';

const tasks = defineModel<Task[]>('tasks', { required: true });

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
</script>

<template>
  <form class="sticky top-10 flex flex-row flex-wrap sm:flex-nowrap items-stretch gap-2" @submit.prevent="onSubmit()">
    <InputText
      v-model="newTask.title"
      placeholder="Write something here..."
      class="w-full shadow min-w-full sm:min-w-0"
      aria-label="New task title"
    />
    <DateButton
      v-model="newTask.dueDate"
      class="text-primary shadow grow sm:grow-0"
      label="New task due date"
    />
    <button
      :disabled="!newTask?.title.length"
      class="shadow flex items-center justify-center aspect-square p-3 rounded-lg font-bold text-sm cursor-pointer bg-primary/50 hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Add new task"
    >
      <FontAwesomeIcon :icon="faPlus" fixed-width />
    </button>
  </form>
</template>
