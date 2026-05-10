import {
  useDeferredValue,
  useMemo,
  useState,
} from 'react'

const WITHOUT_DEFERRED =
  true

const DATA = Array.from(
  {length: 50000},
  (_, i) => ({
    id: i,
    text:
      Math.random()
      .toString(36)
      .repeat(10) + i,
  })
)

function expensiveWork(
  item: string
) {
  let total = 0

  for (
    let i = 0;
    i < 3000;
    i++
  ) {
    total += Math.sqrt(
      i + item.length
    )
  }

  return total
}

export default function App() {
  const [input, setInput] =
    useState('')

  const deferredInput =
    useDeferredValue(input)

  const keyword =
    WITHOUT_DEFERRED
      ? input
      : deferredInput

  const filtered =
    useMemo(() => {
      console.time(
        'filter'
      )

      const result =
        DATA.filter(item => {
          expensiveWork(
            item.text
          )

          return item.text.includes(
            keyword
          )
        })

      console.timeEnd(
        'filter'
      )

      return result
    }, [keyword])

  return (
    <div
      style={{
        padding: 20,
        fontFamily:
          'sans-serif',
      }}
    >
      <h1>
        useDeferredValue
        Demo
      </h1>

      <div
        style={{
          marginBottom: 20,
        }}
      >
        Deferred:
        {
          String(
            !WITHOUT_DEFERRED
          )
        }
      </div>

      <input
        value={input}
        onChange={e =>
          setInput(
            e.target.value
          )
        }
        placeholder="Type fast..."
        style={{
          width: 400,
          height: 50,
          fontSize: 24,
        }}
      />

      <div
        style={{
          marginTop: 20,
        }}
      >
        keyword:
        {keyword}
      </div>

      <div>
        results:
        {
          filtered.length
        }
      </div>

      <div
        style={{
          height: 500,
          overflow:
            'auto',
          marginTop: 20,
          border:
            '1px solid #ccc',
        }}
      >
        {filtered
        .slice(0, 300)
        .map(item => (
          <div
            key={
              item.id
            }
            style={{
              padding: 4,
            }}
          >
            {
              item.text
            }
          </div>
        ))}
      </div>
    </div>
  )
}