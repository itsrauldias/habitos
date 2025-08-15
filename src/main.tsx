import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import './index.css'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // dispara um evento custom p/ mostrar UI de atualização
    window.dispatchEvent(new Event('pwa:need-refresh'))
  },
  onOfflineReady() {
    // dispara um evento p/ avisar que já funciona offline
    window.dispatchEvent(new Event('pwa:offline-ready'))
  },
})
console.log(updateSW)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
)
