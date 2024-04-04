'use client'
import { useState, useEffect } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'

const bfs = `
## Breadth First Search (Busca em Largura)

O algoritmo de busca em largura (BFS) é um algoritmo de busca em grafos que começa pela raiz e explora todos os vizinhos da raiz antes de se mover para os vizinhos dos vizinhos. O algoritmo de busca em largura é um algoritmo de busca não informada, ou seja, ele não requer um conhecimento prévio do grafo.

### Funcionamento

1. Inicialize uma fila vazia e insira o nó raiz.
2. Marque o nó raiz como visitado.
3. Enquanto a fila não estiver vazia, faça o seguinte:
   1. Remova o nó da frente da fila.
   2. Para cada nó adjacente não visitado, marque-o como visitado e insira na fila.
4. Repita o passo 3 até que a fila esteja vazia.

### Implementação em Python

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        node = queue.popleft()
        print(node, end=' ')

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    print()
\`\`\`

### Complexidade de Tempo

- **Tempo de Execução:** O(V + E)
  - Onde V é o número de vértices e E é o número de arestas no grafo.
  - O algoritmo de busca em largura visita cada vértice e aresta no grafo uma única vez, resultando em uma complexidade de tempo linear.

### Considerações Adicionais

- **Grafo Direcionado:** O algoritmo de busca em largura pode ser aplicado a grafos direcionados, mas é importante considerar a direção das arestas ao determinar os vizinhos de um nó.
- **Grafo Não-Direcionado:** O algoritmo de busca em largura é frequentemente utilizado em grafos não-direcionados para encontrar o caminho mais curto entre dois nós.
- **Aplicações:** O algoritmo de busca em largura é amplamente utilizado em problemas de caminho mínimo, conectividade de grafos e modelagem de redes.
`

type Matrix = number[][]

const createMatrix = (rows: number, cols: number): Matrix => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0),
  )
}

export default function BreadFirstSearch() {
  const [rows, setRows] = useState<number>(10) // Tamanho padrão da matriz
  const [cols, setCols] = useState<number>(10)
  const [matrix, setMatrix] = useState<Matrix>(createMatrix(rows, cols)) // Matriz para representar o labirinto
  const [path, setPath] = useState<[number, number][]>([]) // Caminho encontrado
  const [animationSpeed, setAnimationSpeed] = useState<number>(500) // Velocidade da animação

  useEffect(() => {
    setMatrix(createMatrix(rows, cols))
    setPath([])
  }, [rows, cols])

  // Função para gerar paredes aleatórias no labirinto
  const generateRandomWalls = (): void => {
    const newMatrix: Matrix = [...matrix]
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Define uma parede aleatória com 30% de chance
        newMatrix[i][j] = Math.random() < 0.3 ? 1 : 0
      }
    }
    setMatrix(newMatrix)
  }

  // Função para visualizar o algoritmo de BFS
  const visualizeBFS = async (): Promise<void> => {
    const queue: [number, number][] = []
    const visited: boolean[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(false),
    )
    const directions = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ] // cima, esquerda, baixo, direita
    const start: [number, number] = [0, 0]
    const end: [number, number] = [rows - 1, cols - 1]

    queue.push(start)
    visited[start[0]][start[1]] = true

    while (queue.length > 0) {
      const [x, y] = queue.shift()!
      if (x === end[0] && y === end[1]) {
        // Encontrou o destino, sair do loop
        break
      }
      for (const [dx, dy] of directions) {
        const newX = x + dx
        const newY = y + dy
        if (
          newX >= 0 &&
          newX < rows &&
          newY >= 0 &&
          newY < cols &&
          matrix[newX][newY] !== 1 && // Verificar se não é uma parede
          !visited[newX][newY]
        ) {
          queue.push([newX, newY])
          visited[newX][newY] = true
        }
      }
      // Atualizar o caminho encontrado somente após explorar todas as direções possíveis
      setPath((prevPath) => [...prevPath, [x, y]])
      // Aguardar um período de tempo para a animação
      await new Promise((resolve) => setTimeout(resolve, animationSpeed))
    }
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mt-4">
        Breadth First Search
      </h1>
      <div className="m-4">
        <button
          className="border-pink-400 border-2 hover:border-pink-700 text-white font-bold py-2 px-4 rounded"
          onClick={generateRandomWalls}
        >
          Gerar Paredes Aleatórias
        </button>
        <button
          className="mx-4 border-green-400 border-2 hover:border-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={visualizeBFS}
        >
          Visualizar BFS
        </button>
        <input
          title="Velocidade da animação"
          type="range"
          min="100"
          max="1000"
          step="100"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
        />
      </div>
      <div className="m-4">
        <label>
          Linhas:
          <input
            type="number"
            className="bg-transparent border-b border-gray-400 text-white text-center"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
            min={5}
            max={50}
          />
        </label>
        <label>
          Colunas:
          <input
            type="number"
            className="bg-transparent border-b border-gray-400 text-white text-center"
            min={5}
            max={50}
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isPath = path.some(
              ([x, y]) => x === rowIndex && y === colIndex,
            )
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-8 h-8 transition-all duration-300 ease-in-out ${
                  cell === 1
                    ? 'bg-yellow-400'
                    : isPath
                      ? 'bg-purple-500'
                      : 'bg-white'
                } border border-gray-400`}
              />
            )
          }),
        )}
      </div>

      <article className="mt-6 prose w-full md:prose-xl prose-invert text-[#c4c4cc] font-mono font-light prose-code:prose-lg prose-pre:bg-transparent prose-pre:p-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')

              return !inline && match ? (
                <SyntaxHighlighter
                  style={dracula}
                  PreTag="div"
                  language={match[1]}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {bfs}
        </ReactMarkdown>
      </article>
    </main>
  )
}
