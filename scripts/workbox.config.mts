import {GenerateSWOptions} from 'workbox-build';

export function workboxConfig(): Partial<GenerateSWOptions> {
  return {
    swDest: 'dist/sw.js',
    globDirectory: 'dist',
    globPatterns: ['**/*'],
    skipWaiting: true,
    navigateFallback: 'index.html',
    navigationPreload: true,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        // Match any request ending with these extensions
        urlPattern: /\.(?:js|css|html|ico|png|jpg|jpeg|svg|gif|webp)$/,
        // Use a Cache First strategy and fall back to network if not available
        handler: 'CacheFirst',
        options: {
          // Define a custom cache name
          cacheName: 'assets-cache',
          // Configure which responses are considered cacheable
          cacheableResponse: {
            statuses: [0, 200],
          },
          // Configure expiration plugin to remove entries once a limit is reached
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /\.(?:mp3|mp4|pdf)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'media-cache',
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 7,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  };
}
