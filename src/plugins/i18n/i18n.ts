import { createI18n } from 'vue-i18n';
import { en } from '@/plugins/i18n/en';
import { pl } from '@/plugins/i18n/pl';

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    en,
    pl,
  },
});
