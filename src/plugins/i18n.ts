import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      task: {
        title: 'Title',
      },
    },
    pl: {
      task: {
        title: 'Tytuł',
      },
    },
  },
});
