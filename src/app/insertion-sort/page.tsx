'use client'
import React, { useState, useEffect, useCallback } from 'react'

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'

const insertionSortCont = `
## Insertion Sort

Insertion Sort é um algoritmo de ordenação simples e eficiente que constrói a lista ordenada um elemento de cada vez. O algoritmo percorre a lista e, para cada elemento,
verifica se ele está na posição correta. Se o elemento não estiver na posição correta, ele é movido para a posição correta e os elementos são deslocados para abrir espaço.

### Funcionamento

1. O algoritmo percorre a lista da esquerda para a direita.
2. Para cada elemento, o algoritmo verifica se ele está na posição correta.
3. Se o elemento não estiver na posição correta, ele é movido para a posição correta.

### Implementação em C

\`\`\`c
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }

        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    insertionSort(arr, n);

    return 0;
}
\`\`\`

### Complexidade de Tempo

- Melhor caso: O(n)
- Caso médio: O(n^2)
- Pior caso: O(n^2)

### Considerações Adicionais

- Insertion Sort é eficiente para listas pequenas.
- O algoritmo é estável.
- Insertion Sort é um algoritmo in-place.
`

export default function InsertionSort() {
  const [array, setArray] = useState<number[]>([])
  const [animationSpeed, setAnimationSpeed] = useState(100)
  const [isSorting, setIsSorting] = useState(false)
  const [arraySize, setArraySize] = useState(15)
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

  const insertionSort = async () => {
    setIsSorting(true)
    for (let i = 1; i < array.length; i++) {
      const key = array[i]
      let j = i - 1
      setAnalyzingIndex(i)
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j]
        j = j - 1
        setArray([...array])
        await sleep(animationSpeed)
      }
      array[j + 1] = key
      setArray([...array])
      setSortedIndices([...sortedIndices, j + 1])
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
          className="px-4 py-2 border-2 border-red-400 rounded-lg text-white hover:bg-red-400 focus:outline-none"
          onClick={resetArray}
          disabled={isSorting}
        >
          Resetar Array
        </button>
        <button
          className="px-4 py-2 border-2 border-yellow-400 rounded-lg text-white hover:bg-yellow-400 focus:outline-none"
          onClick={insertionSort}
          disabled={isSorting}
        >
          Ordenar
        </button>
        <label className="flex items-center">
          Velocidade:
          <input
            type="range"
            min={10}
            max={1000}
            value={animationSpeed}
            onChange={handleChangeSpeed}
            className="ml-2"
          />
        </label>
        <label className="flex items-center">
          Tamanho do Array:
          <input
            type="number"
            min={1}
            max={50}
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
            className={`h-12 flex items-center transition-all duration-300 ease-in-out px-4 pb-10 pt-4 justify-center text-white ${
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
          {insertionSortCont}
        </ReactMarkdown>
      </article>
    </main>
  )
}
