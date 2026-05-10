import {
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
} from 'react'

export type FancyInputHandle = {
  focus: () => void
  clear: () => void
}



const FancyInput =({ value, onChange, onRequestEmpty,ref ,...rest } )=> {
    const innerRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => innerRef.current?.focus(),
      clear: () => {
        onRequestEmpty?.()
      },
    }))

    return (
      <input
        ref={innerRef}
        value={value}
        onChange={onChange}
        {...rest}
      />
    )
  }

export default function UseImperativeHandleTest() {
  const inputRef = useRef<FancyInputHandle>(null)
  const [draft, setDraft] = useState('')

  return (
    <div
      style={{
        padding: 20,
        fontFamily: 'sans-serif',
      }}
    >
      <h1>useImperativeHandle</h1>
      <p style={{ maxWidth: 560, lineHeight: 1.6 }}>
        父组件通过 ref 调用子组件暴露的 <code>focus</code> / <code>clear</code>，而不依赖整个{' '}
        <code>input</code> DOM。
      </p>
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <FancyInput
          ref={inputRef}
          placeholder="输入一些文字…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onRequestEmpty={() => setDraft('')}
          style={{ width: 280, padding: '8px 10px', fontSize: 16 }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          style={{ padding: '8px 14px' }}
        >
          聚焦
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.clear()}
          style={{ padding: '8px 14px' }}
        >
          清空
        </button>
      </div>
      <p style={{ marginTop: 12, color: '#666' }}>受控展示：{draft || '（空）'}</p>
    </div>
  )
}
