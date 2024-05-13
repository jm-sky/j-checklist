<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const { t, availableLocales, locale: i18nLocale } = useI18n();

const language = useLocalStorage('language', i18nLocale);

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
        <Select v-model="language">
          <SelectTrigger class="bg-primary-dark/75">
            <SelectValue />
          </SelectTrigger>
          <SelectContent class="border-primary/75">
            <SelectGroup>
              <SelectItem
                v-for="option in locales"
                :key="option.locale"
                :value="option.locale"
              >
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
