import { useOptimistic, useState, useTransition } from 'react'

type Item = { id: string; text: string }

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export default function UseOptimisticTest() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', text: '第一条' },
    { id: '2', text: '第二条' },
  ])
  const [optimistic, addOptimistic] = useOptimistic(
    items,
    (state, newItem: Item) => [...state, newItem],
  )
  const [isPending, startTransition] = useTransition()

  async function submit(text: string) {
    const id = crypto.randomUUID()
    const item: Item = { id, text }
    startTransition(async () => {
      addOptimistic(item)
      await delay(800)
      item.text = text+'fdfd'
      setItems((prev) => [...prev, item])
    })
  }

  return (
    <div
      style={{
        padding: 20,
        fontFamily: 'sans-serif',
      }}
    >
      <h1>useOptimistic</h1>
      <p style={{ maxWidth: 560, lineHeight: 1.6 }}>
        添加条目时列表立刻更新；服务端（此处为延迟）结束后与真实 state 对齐。
      </p>
      <form
        style={{ margin: '16px 0', display: 'flex', gap: 8 }}
        onSubmit={(e) => {
          e.preventDefault()
          const fd = new FormData(e.currentTarget)
          const text = String(fd.get('text') ?? '').trim()
          if (!text) return
          void submit(text)
          e.currentTarget.reset()
        }}
      >
        <input
          name="text"
          placeholder="新待办"
          style={{ flex: 1, maxWidth: 320, padding: '8px 10px', fontSize: 16 }}
        />
        <button type="submit" disabled={isPending} style={{ padding: '8px 16px' }}>
          {isPending ? '同步中…' : '添加'}
        </button>
      </form>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.9 }}>
        {optimistic.map((it) => (
          <li key={it.id}>{it.text}</li>
        ))}
      </ul>
    </div>
  )
}
