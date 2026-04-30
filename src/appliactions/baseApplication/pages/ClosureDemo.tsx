import { useCallback, useState } from 'react'

/** 闭包与函数式更新：每次点击 +1，依赖稳定回调 */
export default function ClosureDemo() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  return (
    <>
      <h1 className="base-page-title">闭包测试</h1>
      <p className="base-page-desc">
        使用 <code>useCallback</code> 固定引用，并用 <code>{'setCount(c => c + 1)'}</code>{' '}
        避免闭包拿到过期的 <code>count</code>。可在此文件里改成 <code>setCount(count + 1)</code> 观察差异。
      </p>
      <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>count = {count}</p>
      <button type="button" onClick={increment}>
        +1
      </button>
    </>
  )
}
