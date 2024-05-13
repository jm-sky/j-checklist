<script setup lang="ts">
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import Button from 'primevue/button';
import { onClickOutside } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import DateButton from './DateButton.vue';
import InputText from './InputText.vue';
import { Task, type ITaskInitData } from '@/models/task.model';

const { t } = useI18n();

const inputRef = ref<HTMLInputElement | null>(null);
const formRef = ref<HTMLFormElement | null>(null);
const isExpanded = ref(false);
const tasks = defineModel<Task[]>('tasks', { required: true });

const reset = () => {
  newTask.value.title = '';
  newTask.value.dueDate = null;
};

const expand = () => isExpanded.value = true;
const collapse = () => {
  inputRef.value?.blur?.();
  isExpanded.value = false;
  reset();
};

onClickOutside(formRef, () => collapse());

const newTask = ref<ITaskInitData>({
  title: 'Drink some coffee',
  dueDate: null,
});

const onSubmit = () => {
  tasks.value.unshift(Task.create({
    ...newTask.value,
    dueDate: newTask.value.dueDate,
  }));
  reset();
  collapse();
};
</script>

<template>
  <div class="relative">
    <form
      ref="formRef"
      class="sticky top-10 flex flex-col gap-2 transition-all"
      :class="{'p-2 border border-theme bg-theme rounded-lg -mx-2': isExpanded}"
      @keydown.esc="collapse()"
      @submit.prevent="onSubmit()"
    >
      <div class="flex flex-row flex-wrap sm:flex-nowrap items-stretch gap-2">
        <InputText
          ref="inputRef"
          v-model="newTask.title"
          placeholder="Write something here..."
          class="w-full shadow min-w-full sm:min-w-0"
          aria-label="New task title"
          @focus="expand()"
        />
        <Button
          type="submit"
          :disabled="!newTask?.title.length"
          class="shadow flex items-center justify-center aspect-square p-3 rounded-lg font-bold text-sm cursor-pointer bg-brand/50 hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add new task"
        >
          <FontAwesomeIcon
            :icon="faPlus"
            fixed-width
          />
        </Button>
      </div>
      <div
        v-if="isExpanded"
        class="flex flex-row gap-2"
      >
        <DateButton
          v-model="newTask.dueDate"
          class="text-brand shadow grow sm:grow-0"
          label="New task due date"
          :data-tooltip="t('task.dueDate')"
        />
      </div>
    </form>
  </div>
</template>
