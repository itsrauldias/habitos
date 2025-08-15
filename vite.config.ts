import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',          // atualiza SW automaticamente
      injectRegister: 'auto',              // injeta o registrador no app
      devOptions: { enabled: true },       // SW também em dev (útil pra testar)
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'apple-touch-icon.png'
      ],
      manifest: {
        "short_name": "Hábitos",
        "name": "Hábitos",
        "description": "Registre e monitore seus hábitos diariamente",
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#121827",
        "background_color": "#121827",
        "icons": [
          {
            "src": "habitos.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
        "screenshots": [
          {
            "src": "/screenshots/wide.png",
            "type": "image/png",
            "sizes": "1270x814",
            "form_factor": "wide"
          },
          {
            "src": "/screenshots/narrow.png",
            "type": "image/jpg",
            "sizes": "372x661",
            "form_factor": "narrow"
          }
        ]
      },
      workbox: {
        // pré-cache do app shell + assets gerados pelo build
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],

        // estratégias de cache em tempo de execução:
        runtimeCaching: [
          // APIs: funciona offline com o último response em cache
          {
            urlPattern: /\/api\/.*$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // imagens externas (CDN)
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'image-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 }
            }
          },
          // fontes (Google Fonts, etc.)
          {
            urlPattern: /^https?.*\.(?:woff2?|eot|ttf|otf)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ],

        // SPA fallback: recarregar rotas client-side mesmo offline
        navigateFallback: '/index.html'
      }
    })
  ],
})
