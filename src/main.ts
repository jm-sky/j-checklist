import './assets/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import Lara from '@/components/presets/lara';
import { i18n } from '@/plugins/i18n/i18n';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});

app.mount('#app');
