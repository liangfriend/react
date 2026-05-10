import { useEffect, useEffectEvent, useState } from 'react'

export default function UseEffectEventTest() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [roomId, setRoomId] = useState('general')
  const [lastPing, setLastPing] = useState<string>('—')

  const reportVisit = useEffectEvent(() => {
    setLastPing(`${new Date().toLocaleTimeString()} → ${roomId}`)
  })
/*
* 如果reportVisit是个普通函数，在useEffect内会被缓存，roomId变化了，reportVisit还是原来被缓存的reportVisit，roomId还是旧的
* */
  useEffect(() => {
    const t = window.setInterval(reportVisit, 2500)
    return () => window.clearInterval(t)
  }, [theme])

  return (
    <div
      style={{
        padding: 20,
        fontFamily: 'sans-serif',
        background: theme === 'dark' ? '#1a1a1a' : '#fff',
        color: theme === 'dark' ? '#eee' : '#111',
        minHeight: '100%',
      }}
    >
      <h1>useEffectEvent</h1>
      <p style={{ maxWidth: 560, lineHeight: 1.6, opacity: 0.9 }}>
        下方定时器只在 <code>theme</code> 变化时重建；回调里仍使用最新的{' '}
        <code>roomId</code>。最近一次 ping 会显示在下方。
      </p>
      <p style={{ fontFamily: 'monospace', fontSize: 14 }}>lastPing: {lastPing}</p>
      <div style={{ margin: '20px 0', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          主题
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            style={{ padding: 6 }}
          >
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </label>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          roomId
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={{ padding: 6 }}
          >
            <option value="general">general</option>
            <option value="random">random</option>
            <option value="support">support</option>
          </select>
        </label>
      </div>
    </div>
  )
}
