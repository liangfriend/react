import {
  useMemo,
  useState,
  useTransition,
} from 'react'

const SLOW_LIST_SIZE = 12000

function buildItems(seed: number) {
  return Array.from({ length: SLOW_LIST_SIZE }, (_, i) => ({
    id: `${seed}-${i}`,
    n: (i * seed) % 997,
  }))
}
/*
* 就是变化时，给予一个pending值而已
* */
export default function UseTransitionTest() {
  const [tab, setTab] = useState<'a' | 'b'>('a')
  const [isPending, startTransition] = useTransition()

  const items = useMemo(() => buildItems(tab === 'a' ? 3 : 7), [tab])

  return (
    <div
      style={{
        padding: 20,
        fontFamily: 'sans-serif',
      }}
    >
      <h1>useTransition</h1>
      <p style={{ maxWidth: 560, lineHeight: 1.6 }}>
        切换页签时用 <code>startTransition</code> 包裹重计算，UI 可先响应点击；重渲染期间{' '}
        <code>isPending</code> 为 true。
      </p>
      <div style={{ display: 'flex', gap: 10, margin: '16px 0', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => {
            startTransition(() => setTab('a'))
          }}
          style={{ padding: '8px 14px' }}
        >
          Tab A（慢列表）
        </button>
        <button
          type="button"
          onClick={() => {
            startTransition(() => setTab('b'))
          }}
          style={{ padding: '8px 14px' }}
        >
          Tab B（慢列表）
        </button>
        <span style={{ color: isPending ? '#c60' : '#080' }}>
          {isPending ? '过渡中…' : '空闲'}
        </span>
        <span>当前: {tab}</span>
      </div>
      <div
        style={{
          height: 360,
          overflow: 'auto',
          border: '1px solid #ccc',
          fontSize: 12,
          fontFamily: 'monospace',
        }}
      >
        {items.slice(0, 400).map((it) => (
          <div key={it.id}>{it.n}</div>
        ))}
      </div>
    </div>
  )
}
