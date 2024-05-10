<script setup lang="ts">
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import dayjs from 'dayjs';

withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Date',
  },
);

const value = defineModel<string | null>('modelValue', { required: true });
const dateRef = ref<HTMLInputElement | null>(null);

const openCalendar = () => dateRef.value?.showPicker();
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center px-3 py-2 rounded-lg text-sm border border-current/50 hover:bg-black/15 transition-colors cursor-pointer"
    :aria-label="`${label} picker`"
    @click="openCalendar"
  >
    <div v-if="value" class="text-sm whitespace-nowrap font-light text-white mr-2 leading-tight grow">
      {{ dayjs(value).toDate().toDateString() }}
    </div>
    <input v-model="value" type="date" class="w-0 h-0 border-0 outline-0" ref="dateRef" :aria-label="`${label} input`">
    <FontAwesomeIcon :icon="faCalendar" class="text-white" fixed-width />
  </button>
</template>

<style>

</style>
