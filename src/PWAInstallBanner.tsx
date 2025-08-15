import { useEffect, useState } from 'react'

export default function PWAInstallBanner() {
    const [needRefresh, setNeedRefresh] = useState(false)
    const [offlineReady, setOfflineReady] = useState(false)

    useEffect(() => {
        const onNeedRefresh = () => setNeedRefresh(true)
        const onOfflineReady = () => setOfflineReady(true)
        window.addEventListener('pwa:need-refresh', onNeedRefresh)
        window.addEventListener('pwa:offline-ready', onOfflineReady)
        return () => {
            window.removeEventListener('pwa:need-refresh', onNeedRefresh)
            window.removeEventListener('pwa:offline-ready', onOfflineReady)
        }
    }, [])

    // banner minimalista
    if (!needRefresh && !offlineReady) return null

    const reload = () => location.reload()

    return (
        <div style={{
            position: 'fixed', left: 0, right: 0, bottom: 0,
            padding: '12px 16px',
            background: '#111827', color: 'white',
            display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center'
        }}>
            <span>
                {needRefresh ? 'Uma atualização está pronta.' : 'Este app já funciona offline.'}
            </span>
            {needRefresh && (
                <button onClick={reload} style={{
                    padding: '6px 12px', background: 'white', color: '#111827',
                    borderRadius: 8, border: 'none', cursor: 'pointer'
                }}>
                    Atualizar
                </button>
            )}
        </div>
    )
}
