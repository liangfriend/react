import { useSyncExternalStore } from 'react'

let store = { clicks: 0 }
const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

function getSnapshot() {
  return store.clicks
}

function getServerSnapshot() {
  return 0
}

function incrementExternal() {
  store = { clicks: store.clicks + 1 }
  listeners.forEach((l) => {
    l()
  })
}
/*
* 这个hook的本质是，接收一个subscribe, 这个函数需要接收一个函数参数，每当这个函数参数被执行。更新snapshot从而达到同步变化
* 第三个参数只有在服务端生成 HTML 时以及当 React 拿到服务端的 HTML 并使其可交互才会触发，如果不是服务端渲染就不用这个
* */
export default function UseSyncExternalStoreTest() {
  const clicks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <div
      style={{
        padding: 20,
        fontFamily: 'sans-serif',
      }}
    >
      <h1>useSyncExternalStore</h1>
      <p style={{ maxWidth: 560, lineHeight: 1.6 }}>
        订阅模块级外部 store（非 React state），在并发渲染下通过 snapshot 保持一致。
      </p>
      <div style={{ fontSize: 28, margin: '16px 0' }}>外部 clicks: {clicks}</div>
      <button
        type="button"
        onClick={incrementExternal}
        style={{ padding: '10px 18px', fontSize: 16 }}
      >
        直接改 store + 通知订阅者
      </button>
    </div>
  )
}
