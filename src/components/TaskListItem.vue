<script setup lang="ts">
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faCalendar, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import { onClickOutside } from '@vueuse/core';
import DateButton from './DateButton.vue';
import InputText from './InputText.vue';
import type { Task } from '@/models/task.model';

const task = defineModel<Task>('task', { required: true });
const itemRef = ref<HTMLElement>();

onClickOutside(itemRef, () => toggleEditing(false));

const isEditing = ref(false);
const draft = ref({
  title: task.value.title,
  dueDate: task.value.dueDateString,
});

const emit = defineEmits<{
  delete: []
}>();

const toggleIsDone = () => {
  draft.value.dueDate = task.value.dueDateString;
  task.value.doneDate = task.value.isDone ? null : new Date();
};

const reset = () => {
  draft.value.title = task.value.title;
  draft.value.dueDate = task.value.dueDateString;
};

const toggleEditing = (state?: boolean) => {
  reset();
  isEditing.value = state === undefined ? !isEditing.value : state;
};

const save = () => {
  task.value.title = draft.value.title ?? task.value.title;
  task.value.dueDate = draft.value.dueDate ? dayjs(draft.value.dueDate).toDate() : null;
  isEditing.value = false;
};

const doneButtonLabel = computed(() => task.value.isDone ? 'Mark as undone' : 'Mark as done');
</script>

<template>
  <div
    ref="itemRef"
    :class="[
      { 'scale-105 ring ring-destructive': isEditing && task.isOverdue },
      { 'scale-105 ring ring-brand': isEditing && !task.isOverdue },
      { 'opacity-50': task.isDone },
      task.isOverdue ? 'bg-red-800/40 border-destructive-dark/50 hover:ring-destructive-dark/50' : 'border-theme bg-theme hover:ring-brand',
    ]"
    class="group flex flex-row gap-3 items-center justify-between border px-3 py-2.5 rounded-lg shadow-lg relative  hover:ring"
  >
    <button
      class="cursor-pointer text-white/85 hover:text-white"
      :data-tooltip="doneButtonLabel"
      :aria-label="doneButtonLabel"
      @click="toggleIsDone()"
    >
      <FontAwesomeIcon
        v-if="task.isDone"
        :icon="faCheckCircle"
        fixed-width
      />
      <FontAwesomeIcon
        v-else
        :icon="faCircle"
        fixed-width
      />
    </button>

    <div
      v-if="!isEditing"
      :class="{ 'line-through': task.isDone }"
      class="flex flex-col sm:flex-row items-center gap-2 w-full duration-500"
    >
      {{ task.title }}
      <span
        v-if="task.dueDate"
        class="text-xs font-light sm:border-l sm:pl-2"
      >
        <FontAwesomeIcon
          :icon="faCalendar"
          fixed-width
        />
        {{ task.dueDate?.toDateString() }}
      </span>
    </div>

    <div
      v-if="isEditing"
      class="flex flex-col sm:flex-row items-stretch justify-stretch gap-2 w-full -my-2 duration-500"
    >
      <InputText
        v-model="draft.title"
        class="w-full"
        :error="task.isOverdue"
        aria-label="Task title"
        @keydown.enter="save()"
      />
      <DateButton
        v-model="draft.dueDate"
        :class="task.isOverdue ? 'text-red-600' : 'text-primary'"
        label="Task due date"
      />
    </div>
    
    <div
      :class="{ 'opacity-0': !isEditing }"
      class="flex flex-row gap-1 text-sm items-center group-hover:opacity-100 transition-opacity delay-300 group-hover:delay-0"
    >
      <template v-if="isEditing">
        <button
          class="rounded py-1 px-2 cursor-pointer text-white/85 hover:text-white hover:bg-white/10"
          data-tooltip="Cancel"
          aria-label="Cancel"
          @click="toggleEditing()"
        >
          <FontAwesomeIcon
            :icon="faTimes"
            class="scale-90"
          />
        </button>
        <button
          class="rounded py-1 px-2 cursor-pointer text-white/85 hover:text-white hover:bg-white/10"
          data-tooltip="Save"
          aria-label="Save"
          @click="save()"
        >
          <FontAwesomeIcon
            :icon="faCheck"
            class="scale-90"
          />
        </button>
      </template>
      <template v-else>
        <button
          class="rounded py-1 px-2 cursor-pointer text-white/85 hover:text-white hover:bg-white/10"
          data-tooltip="Edit"
          aria-label="Edit"
          @click="toggleEditing()"
        >
          <FontAwesomeIcon
            :icon="faEdit"
            class="scale-90"
          />
        </button>
        <button
          class="rounded py-1 px-2 cursor-pointer text-white/85 hover:text-white hover:bg-white/10"
          data-tooltip="Delete"
          aria-label="Delete"
          @click="emit('delete')"
        >
          <FontAwesomeIcon
            :icon="faTimes"
            class="scale-90"
          />
        </button>
      </template>
    </div>
  </div>
</template>
