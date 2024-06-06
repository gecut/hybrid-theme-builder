import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
import Unfonts from 'unplugin-fonts/vite';
import {workboxConfig} from './scripts/workbox.config.mts';
import {getYarnCachePath} from './scripts/yarn-cache.config.mts';
import {description} from './package.json';

export default defineConfig(async ({command, mode}) => {
  const yarnCachePath = await getYarnCachePath();

  console.log({
    command,
    mode,
    yarnCachePath,
  });

  return {
    base: '/',
    clearScreen: true,

    css: {
      postcss: 'postcss.config.mjs',
    },

    build: {
      sourcemap: true,
      target: ['esnext', 'edge100', 'firefox100', 'chrome100', 'safari18'],
    },

    plugins: [
      VitePWA({
        manifest: {
          id: '/',
          scope: '/?pwa',
          name: 'Hybrid Theme Builder',
          display: 'standalone',
          start_url: '/',
          short_name: 'HTB',
          theme_color: '#d84113',
          description,
          orientation: 'portrait',
          background_color: '#d84113',
          icons: [
            {src: '/favicon.ico', type: 'image/x-icon', sizes: '16x16'},
            {src: '/icon-192.png', type: 'image/png', sizes: '192x192', purpose: 'any'},
            {src: '/icon-512.png', type: 'image/png', sizes: '512x512', purpose: 'any'},
            {src: '/icon-192-maskable.png', type: 'image/png', sizes: '192x192', purpose: 'maskable'},
            {src: '/icon-512-maskable.png', type: 'image/png', sizes: '512x512', purpose: 'maskable'},
          ],
        },
        workbox: workboxConfig(),
        devOptions: {
          enabled: false,
        },
      }),

      Unfonts({
        fontsource: {
          families: ['Varela Round'],
        },
        google: {
          families: [
            {
              name: 'Roboto',
              styles: 'wght@300',
              defer: true,
            },
          ],
          display: 'swap',
          injectTo: 'head-prepend',
          preconnect: true,
        },
      }),
    ],
  };
});
