import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv  } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  return {
    base: env.VITE_APP_BASE_URL ?? '/',
    plugins: [
      vue(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'J-CheckList',
          short_name: 'CheckList',
          description: 'Simple CheckList for task management.',
          theme_color: '#0da2e7',
          icons: [
            {
              src: 'icons/64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'icons/192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icons/512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'icons/1024.png',
              sizes: '1024x1024',
              type: 'image/png',
            },
            {
              src: 'icons//mask-icon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
