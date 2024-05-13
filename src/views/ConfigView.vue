<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Dropdown from 'primevue/dropdown';
import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const { t, availableLocales, locale } = useI18n();

const language = useLocalStorage('language', locale);

const locales = computed(() => availableLocales.map(locale => ({
  locale,
  label: locale.toUpperCase(),
})));

</script>

<template>
  <div class="about p-4 rounded-lg border-theme bg-theme shadow">
    <h1 class="font-bold text-xl mb-4">
      {{ t('page.Config') }}
    </h1>
    
    <div class="grid grid-cols-2 gap-2 items-center">
      <div>{{ t('ui.Language') }}:</div>
      <div>
        <Dropdown
          v-model="language"
          :options="locales"
          option-value="locale"
          option-label="label"
          class="w-full md:w-[14rem]"
          @update:model-value="locale = language"
        />
      </div>
    </div>
  </div>
</template>
