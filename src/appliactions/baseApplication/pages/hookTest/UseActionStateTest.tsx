import { useActionState } from 'react'

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export default function UseActionStateTest() {
  const [count, bump, isPending] = useActionState(async (prev: number) => {
    await delay(450)
    return prev + 1
  }, 0)

  return (
    <div
      style={{
        padding: 20,
        fontFamily: 'sans-serif',
      }}
    >
      <h1>useActionState</h1>
      <p style={{ maxWidth: 520, lineHeight: 1.6 }}>
        点击后异步更新状态；<code>isPending</code> 在服务端 action 往返期间为 true（此处用延迟模拟）。
      </p>
      <div style={{ fontSize: 28, margin: '16px 0' }}>count: {count}</div>
      <button
        type="button"
        onClick={() => {
          void bump()
        }}
        disabled={isPending}
        style={{
          padding: '10px 18px',
          fontSize: 16,
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
      >
        {isPending ? '处理中…' : '+1（异步）'}
      </button>
    </div>
  )
}
