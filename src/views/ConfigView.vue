<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, availableLocales } = useI18n();
</script>

<template>
  <div class="about p-4 rounded-lg border-theme bg-theme shadow">
    <h1 class="font-bold text-xl mb-4">{{ t('page.Config') }}</h1>
    
    <div class="grid grid-cols-2 gap-2">
      <div>Language:</div>
      <div>
        <select>
          <option v-for="locale in availableLocales" :key="locale">{{ locale }}</option>
        </select>
      </div>
    </div>
    
  </div>
</template>
