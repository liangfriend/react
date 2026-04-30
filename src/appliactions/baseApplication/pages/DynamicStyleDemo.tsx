import { useMemo, useState } from 'react'

export default function DynamicStyleDemo() {
  const [hue, setHue] = useState(200)

  const boxStyle = useMemo(
    () => ({
      width: 120,
      height: 120,
      borderRadius: 8,
      backgroundColor: `hsl(${hue} 70% 45%)`,
      boxShadow: `0 0 24px hsl(${hue} 80% 50% / 0.35)`,
      transition: 'background-color 0.2s, box-shadow 0.2s',
    }),
    [hue],
  )

  return (
    <>
      <h1 className="base-page-title">动态 style 测试</h1>
      <p className="base-page-desc">
        行内 <code>style</code> 用驼峰属性名；色相由 state 驱动，用 <code>useMemo</code>{' '}
        避免每次渲染新建对象（可选优化）。
      </p>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 280 }}>
        <span style={{ fontSize: '0.85rem', color: '#9aa3b5' }}>色相 hue: {hue}</span>
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
        />
      </label>
      <div style={{ marginTop: 20 }}>
        <div style={boxStyle} />
      </div>
    </>
  )
}
