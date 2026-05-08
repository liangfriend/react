import {useState} from 'react'

type Box = {
  id: number
  x: number
  y: number
}

type State = {
  boxes: Box[]
}

function createInitial(): State {
  return {
    boxes: Array.from(
      {length: 50},
      (_, i) => ({
        id: i,
        x:
          Math.random() *
          800,
        y:
          Math.random() *
          500,
      })
    ),
  }
}

export default function App() {
  const [history, setHistory] =
    useState<State[]>([
      createInitial(),
    ])

  const [index, setIndex] =
    useState(0)

  const current =
    history[index]

  function commit(
    next: State
  ) {
    const newHistory =
      history.slice(
        0,
        index + 1
      )

    newHistory.push(next)

    setHistory(
      newHistory
    )

    setIndex(
      newHistory.length -
      1
    )
  }

  function randomMove() {
    const next: State =
      structuredClone(
        current
      )

    for (
      let i = 0;
      i < 10;
      i++
    ) {
      const box =
        next.boxes[
          Math.floor(
            Math.random() *
            next
              .boxes
              .length
          )
          ]

      box.x +=
        Math.random() *
        100 -
        50

      box.y +=
        Math.random() *
        100 -
        50
    }

    commit(next)
  }

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h1>
        Immutable
        Editor Demo
      </h1>

      <button
        onClick={
          randomMove
        }
      >
        Random Move
      </button>

      <button
        disabled={
          index === 0
        }
        onClick={() =>
          setIndex(
            i => i - 1
          )
        }
      >
        Undo
      </button>

      <button
        disabled={
          index ===
          history.length -
          1
        }
        onClick={() =>
          setIndex(
            i => i + 1
          )
        }
      >
        Redo
      </button>

      <div
        style={{
          position:
            'relative',
          width: 1000,
          height: 600,
          border:
            '1px solid #ccc',
          overflow:
            'hidden',
          marginTop: 20,
        }}
      >
        {current.boxes.map(
          box => (
            <div
              key={
                box.id
              }
              style={{
                position:
                  'absolute',

                width: 40,
                height: 40,

                background:
                  'royalblue',

                left:
                box.x,

                top:
                box.y,

                transition:
                  'all 0.2s',
              }}
            />
          )
        )}
      </div>
    </div>
  )
}