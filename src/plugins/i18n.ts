import { createI18n } from 'vue-i18n';
import { en } from '@/plugins/en';
import { pl } from '@/plugins/pl';

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en,
    pl,
  },
});
