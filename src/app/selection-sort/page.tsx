'use client'
import React, { useState, useEffect, useCallback } from 'react'

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'

const selectionSortCont = `
## Selection Sort

Selection Sort é um algoritmo de ordenação simples e in-place que divide a lista em duas partes: a parte ordenada e a parte não ordenada. O algoritmo seleciona o menor elemento da parte não ordenada e o insere na parte ordenada.

### Funcionamento

1. O algoritmo divide a lista em duas partes: a parte ordenada e a parte não ordenada.
2. O algoritmo encontra o menor elemento da parte não ordenada e o insere na parte ordenada.
3. O algoritmo repete o processo até que a lista esteja completamente ordenada.

### Implementação em C

\`\`\`c
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}
\`\`\`

### Complexidade de Tempo

- **Melhor Caso:** O(n^2)
- **Caso Médio:** O(n^2)
- **Pior Caso:** O(n^2)
  - O algoritmo sempre executa o mesmo número de comparações, independentemente da entrada.

### Considerações Adicionais

- Selection Sort é in-place.
- O algoritmo é estável.
- Selection Sort é eficiente para listas pequenas.
`

export default function SelectionSort() {
  const [array, setArray] = useState<number[]>([])
  const [animationSpeed, setAnimationSpeed] = useState(100)
  const [isSorting, setIsSorting] = useState(false)
  const [arraySize, setArraySize] = useState(10)
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [analyzingIndex, setAnalyzingIndex] = useState<number | null>(null)

  const resetArray = useCallback(() => {
    const newArray: number[] = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1)
    }
    setArray(newArray)
    setSortedIndices([])
    setAnalyzingIndex(null)
  }, [arraySize])

  useEffect(() => {
    resetArray()
  }, [arraySize, resetArray])

  const selectionSort = async () => {
    setIsSorting(true)
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i
      for (let j = i + 1; j < array.length; j++) {
        setAnalyzingIndex(j)
        await sleep(animationSpeed)
        if (array[j] < array[minIndex]) {
          minIndex = j
        }
      }
      const temp = array[i]
      array[i] = array[minIndex]
      array[minIndex] = temp
      setArray([...array])
      setSortedIndices([...sortedIndices, i])
    }
    setIsSorting(false)
  }

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const handleChangeSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationSpeed(parseInt(e.target.value))
  }

  const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArraySize(parseInt(e.target.value))
  }

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center space-x-4 mb-4">
        <button
          type="button"
          title="Resetar Array"
          className="px-4 py-2 border-2 border-red-400 rounded-lg text-white hover:bg-red-400 focus:outline-none"
          onClick={resetArray}
          disabled={isSorting}
        >
          Resetar Array
        </button>
        <button
          type="button"
          title="Ordenar Array"
          className="px-4 py-2 border-2 border-yellow-400 text-white rounded hover:bg-yellow-500 focus:outline-none"
          onClick={selectionSort}
          disabled={isSorting}
        >
          Ordenar
        </button>
        <label className="flex items-center">
          Velocidade:
          <input
            type="range"
            min="10"
            max="500"
            value={animationSpeed}
            onChange={handleChangeSpeed}
            className="ml-2"
          />
        </label>
        <label className="flex items-center">
          Tamanho do Array:
          <input
            type="number"
            min="1"
            value={arraySize}
            onChange={handleChangeSize}
            className="ml-2 w-16 outline-none bg-gray-800 text-white p-1 rounded-lg border-none"
          />
        </label>
      </div>
      <div className="flex items-end justify-center space-x-1">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`h-12 flex items-center px-4 pb-10 pt-4 transition-all duration-300 ease-in-out justify-center text-white ${
              sortedIndices.includes(idx)
                ? 'bg-green-400'
                : idx === analyzingIndex
                  ? 'bg-purple-400'
                  : 'bg-yellow-400'
            }`}
            style={{ height: `${value * 5}px`, width: `${120 / arraySize}%` }}
          >
            {value}
          </div>
        ))}
      </div>
      <article className="mt-6 prose w-full md:prose-xl prose-invert text-[#c4c4cc] font-mono font-light prose-code:prose-lg prose-pre:bg-transparent prose-pre:p-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
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
          {selectionSortCont}
        </ReactMarkdown>
      </article>
    </main>
  )
}
