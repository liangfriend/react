import { useDebugValue, useEffect, useState } from 'react'

function useOnlineLabel(userId: number) {
  const [online, setOnline] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      setOnline((v) => !v)
    }, 4000)
    return () => window.clearInterval(id)
  }, [])

  useDebugValue(online, (isOn) =>
    isOn ? `用户 ${userId} 在线` : `用户 ${userId} 离线`,
  )

  return online
}

export default function UseDebugValueTest() {
  const [userId, setUserId] = useState(1)
  const online = useOnlineLabel(userId)

  return (
    <div
      style={{
        padding: 20,
        fontFamily: 'sans-serif',
      }}
    >
      <h1>useDebugValue</h1>
      <p style={{ maxWidth: 560, lineHeight: 1.6 }}>
        打开 React DevTools → Components，选中本页子树中的自定义 Hook（或父组件），可在面板里看到
        useDebugValue 提供的调试标签（开发环境）。
      </p>
      <div style={{ margin: '16px 0', display: 'flex', gap: 12, alignItems: 'center' }}>
        <span>userId:</span>
        <button
          type="button"
          onClick={() => setUserId((n) => n + 1)}
          style={{ padding: '6px 12px' }}
        >
          切换为 {userId + 1}
        </button>
      </div>
      <div style={{ fontSize: 18 }}>
        模拟状态：<strong>{online ? '在线' : '离线'}</strong>（约每 4 秒翻转）
      </div>
    </div>
  )
}
