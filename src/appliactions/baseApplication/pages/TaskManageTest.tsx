import {
  useEffect,
  useMemo,
  useState,
  startTransition,
} from 'react'

function HeavyList({
                     value,
                   }: {
  value: number
}) {
  const items =
    useMemo(() => {
      const arr = []

      for (
        let i = 0;
        i < 30000;
        i++
      ) {
        arr.push(
          <div
            key={i}
          >
            Item {i} -
            {
              value
            }
          </div>
        )
      }

      return arr
    }, [value])

  return (
    <div>
      {items}
    </div>
  )
}

export default function App() {
  const [count, setCount] =
    useState(0)

  const [text, setText] =
    useState('')

  const [angle, setAngle] =
    useState(0)

  useEffect(() => {
    let frame = 0

    function loop() {
      frame += 2

      setAngle(frame)

      requestAnimationFrame(
        loop
      )
    }

    loop()
  }, [])

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h1>
        React Scheduler
        Demo
      </h1>

      <input
        value={text}
        onChange={e =>
          setText(
            e.target.value
          )
        }
        placeholder="Type here"
        style={{
          width: 300,
          height: 40,
          fontSize: 18,
        }}
      />

      <button
        onClick={() => {
          startTransition(
            () => {
              setCount(
                c =>
                  c + 1
              )
            }
          )
        }}
      >
        Heavy Update
      </button>

      <div
        style={{
          width: 100,
          height: 100,
          background:
            'red',
          marginTop: 20,
          transform: `rotate(${angle}deg)`,
        }}
      />

      <HeavyList
        value={count}
      />
    </div>
  )
}