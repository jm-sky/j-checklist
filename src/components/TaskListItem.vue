<script setup lang="ts">
import { faCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import DateButton from './DateButton.vue';
import type { Task } from '@/models/task.model';

const task = defineModel<Task>('task', { required: true });

const isEditing = ref(false);
const newTitle = ref(task.value.title);

const emit = defineEmits<{
  delete: []
}>();

const toggle = () => {
  task.value.doneDate = task.value.isDone ? null : new Date();
};

const save = () => {
  task.value.title = newTitle.value ?? task.value.title;
  isEditing.value = false;
};
</script>

<template>
  <div
    :class="[{ 'opacity-50': task.isDone }, task.isOverdue ? 'bg-red-800/40 border-red-500/50' : 'border-primary-500/50 bg-primary-800/40']"
    class="group flex flex-row gap-3 items-center justify-between border px-3 py-2 rounded-lg shadow-lg"
  >
    <button class="cursor-pointer text-white/85 hover:text-white" @click="toggle()" data-tooltip="Done/Undone">
      <FontAwesomeIcon v-if="task.isDone" :icon="faCheck" fixed-width />
      <FontAwesomeIcon v-else :icon="faCircle" fixed-width />
    </button>

    <div v-if="!isEditing" :class="{ 'line-through': task.isDone }" class="w-full">
      {{ task.title }}

      <span v-if="task.dueDate" class="ml-2 text-xs font-light border-l pl-2">
        <FontAwesomeIcon :icon="faCalendar" fixed-width />
        {{ task.dueDate?.toDateString() }}
      </span>
    </div>

    <div v-if="isEditing" class="flex flex-row items-center justify-stretch gap-2 w-full  -my-1">
      <input
        v-model="newTitle"
        class="w-full rounded-lg px-3 py-2 font-light bg-black/30"
        :class="task.isOverdue ? 'border-red-500/30' : 'border-primary/30'"
        @keydown.enter=save()
      />
      <DateButton v-model="task.dueDateString" />
    </div>

    <div
      :class="{ 'opacity-0': !isEditing }"
      class="flex flex-row gap-3 text-sm items-center group-hover:opacity-100 transition-opacity delay-300 group-hover:delay-0"
      >
      <template v-if="isEditing">
        <button class="cursor-pointer text-white/85 hover:text-white" @click="save()" data-tooltip="Save">
          <FontAwesomeIcon :icon="faTimes" class="scale-90" />
        </button>
        <button class="cursor-pointer text-white/85 hover:text-white" @click="isEditing = !isEditing" data-tooltip="Cancel">
          <FontAwesomeIcon :icon="faCheck" class="scale-90" />
        </button>
      </template>
      <template v-else>
        <button class="cursor-pointer text-white/85 hover:text-white" @click="isEditing = !isEditing" data-tooltip="Edit">
          <FontAwesomeIcon :icon="faEdit" class="scale-90" />
        </button>
        <button class="cursor-pointer text-white/85 hover:text-white" @click="emit('delete')" data-tooltip="Delete">
          <FontAwesomeIcon :icon="faTimes" class="scale-90" />
        </button>
      </template>
    </div>
  </div>
</template>
