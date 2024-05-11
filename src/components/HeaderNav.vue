<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <header class="sticky top-0 flex flex-row items-center justify-between border-b border-brand-500/50 px-3 w-full bg-theme backdrop-blur-md shadow-lg">
    <h1 class="flex flex-row items-center gap-2 py-1 font-bold text-xl opacity-75">
      <FontAwesomeIcon :icon="faTasks" />
      J-CheckList
    </h1>
    <nav class="flex flex-row items-center justify-end gap-4">
      <RouterLink to="/" class="py-1 text-brand-300 hover:text-brand-100 border-b-2 border-transparent" exact-active-class="text-white border-white">{{ t('page.Home') }}</RouterLink>
      <RouterLink to="/config" class="py-1 text-brand-300 hover:text-brand-100 border-b-2 border-transparent" exact-active-class="text-white border-white">{{ t('page.Config') }}</RouterLink>
    </nav>
  </header>
</template>
