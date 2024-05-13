import { VitePWA } from 'vite-plugin-pwa';

export const vitePWA = () => VitePWA({
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
});
