import {
  memo,
  useMemo,
  useState,
} from 'react'

type NodeType = {
  id: number
  value: number
  children?: NodeType[]
}

function createTree(
  depth: number,
  breadth: number
): NodeType[] {
  let id = 0

  function build(
    level: number
  ): NodeType {
    const node: NodeType = {
      id: id++,
      value: Math.random() * 1000,
    }

    if (level < depth) {
      node.children = Array.from(
        {length: breadth},
        () => build(level + 1)
      )
    }

    return node
  }

  return Array.from(
    {length: breadth},
    () => build(0)
  )
}

const TreeNode = memo(
  function TreeNode({
                      node,
                    }: {
    node: NodeType
  }) {
    const color = `hsl(
      ${node.value % 360},
      80%,
      55%
    )`

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            fontSize: 10,
            fontWeight: 'bold',

            color: 'white',

            borderRadius: 4,

            background: color,

            transition:
              'background 0.05s linear',

            willChange:
              'background',
          }}
        >
          {node.value.toFixed(0)}
        </div>

        {
          node.children && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                marginLeft: 6,
              }}
            >
              {
                node.children.map(
                  child => (
                    <TreeNode
                      key={child.id}
                      node={child}
                    />
                  )
                )
              }
            </div>
          )
        }
      </div>
    )
  }
)

export default function App() {
  const [tree, setTree] =
    useState(() =>
      createTree(5, 6)
    )

  const [slider, setSlider] =
    useState(0)

  const totalNodes =
    useMemo(() => {
      let count = 0

      function walk(
        nodes: NodeType[]
      ) {
        for (const node of nodes) {
          count++

          if (
            node.children
          ) {
            walk(
              node.children
            )
          }
        }
      }

      walk(tree)

      return count
    }, [tree])

  function updateDeepValue(
    value: number
  ) {
    setSlider(value)

    setTree(prev => {
      const cloned =
        structuredClone(prev)

      for (
        let i = 0;
        i < 200;
        i++
      ) {
        const a =
          cloned[
          i %
          cloned.length
            ]

        const b =
          a.children?.[
          i %
          (a.children
              ?.length ||
            1)
            ]

        const c =
          b?.children?.[
          i %
          (b.children
              ?.length ||
            1)
            ]

        const d =
          c?.children?.[
          i %
          (c.children
              ?.length ||
            1)
            ]

        if (d) {
          d.value =
            (value *
              (i + 1)) %
            1000
        }
      }

      return cloned
    })
  }

  return (
    <div
      style={{
        background:
          '#111',

        color: 'white',

        minHeight:
          '100vh',

        padding: 20,
      }}
    >
      <div
        style={{
          position:
            'sticky',

          top: 0,

          background:
            '#111',

          zIndex: 10,

          paddingBottom:
            20,
        }}
      >
        <h1>
          React19
          Stress Test
        </h1>

        <div>
          Nodes:
          {totalNodes}
        </div>

        <input
          type="range"
          min="0"
          max="1000"
          value={slider}
          onChange={e =>
            updateDeepValue(
              Number(
                e.target.value
              )
            )
          }
        />

        <div>
          Slider:
          {slider}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {
          tree.map(node => (
            <TreeNode
              key={node.id}
              node={node}
            />
          ))
        }
      </div>
    </div>
  )
}