'use client'
import React, { useState, useEffect, useCallback } from 'react'

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'

const mergeSortCont = `
## Merge Sort

Merge Sort é um algoritmo de classificação estável e eficiente que utiliza a estratégia de divisão e conquista para ordenar uma lista de elementos. O algoritmo divide a
lista em sublistas menores, ordena essas sublistas e, em seguida, combina-as em uma única lista ordenada.

### Funcionamento

1. O algoritmo divide a lista em duas sublistas de tamanhos aproximadamente iguais.
2. Cada sublista é ordenada recursivamente.
3. As sublistas ordenadas são combinadas em uma única lista ordenada.

### Implementação em C

\`\`\`c
void merge(int arr[], int low, int mid, int high) {
    int n1 = mid - low + 1;
    int n2 = high - mid;
    int left[n1], right[n2];

    for (int i = 0; i < n1; i++) {
        left[i] = arr[low + i];
    }
    for (int i = 0; i < n2; i++) {
        right[i] = arr[mid + 1 + i];
    }

    int i = 0, j = 0, k = low;
    int newArr[high + 1];

    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            newArr[k] = left[i];
            i++;
        } else {
            newArr[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        newArr[k] = left[i];
        i++;
        k++;
    }

    while (j < n2) {
        newArr[k] = right[j];
        j++;
        k++;
    }

    for (int idx = low; idx <= high; idx++) {
        arr[idx] = newArr[idx];
    }
}

void mergeSort(int arr[], int low, int high) {
    if (low < high) {
        int mid = low + (high - low) / 2;
        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}

\`\`\`

### Complexidade de Tempo

- **Melhor Caso:** O(n log n)
- **Caso Médio:** O(n log n)
- **Pior Caso:** O(n log n)

### Considerações Adicionais

- **Estabilidade:** O Merge Sort é um algoritmo estável, o que significa que a ordem relativa dos elementos iguais não é alterada durante a ordenação.
- **In-Place:** O Merge Sort não é um algoritmo in-place, pois requer espaço adicional para armazenar as sublistas durante a ordenação.
- **Adaptação:** O Merge Sort é um algoritmo eficiente para ordenar listas encadeadas, pois a operação de mesclagem pode ser realizada sem a necessidade de espaço adicional.
`

export default function MergeSort() {
  const [array, setArray] = useState<number[]>([])
  const [animationSpeed, setAnimationSpeed] = useState(100)
  const [isSorting, setIsSorting] = useState(false)
  const [arraySize, setArraySize] = useState(15)
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [analyzingIndices, setAnalyzingIndices] = useState<number[]>([])

  const resetArray = useCallback(() => {
    const newArray: number[] = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1)
    }
    setArray(newArray)
    setSortedIndices([])
    setAnalyzingIndices([])
  }, [arraySize])

  useEffect(() => {
    resetArray()
  }, [arraySize, resetArray])

  const mergeSort = async (arr: number[]) => {
    setIsSorting(true)
    await mergeSortHelper(arr, 0, arr.length - 1)
    setIsSorting(false)
  }

  const mergeSortHelper = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const mid = Math.floor((low + high) / 2)
      await mergeSortHelper(arr, low, mid)
      await mergeSortHelper(arr, mid + 1, high)
      await merge(arr, low, mid, high)
    }
  }

  const merge = async (
    arr: number[],
    low: number,
    mid: number,
    high: number,
  ) => {
    const n1 = mid - low + 1
    const n2 = high - mid
    const left = new Array(n1)
    const right = new Array(n2)

    for (let i = 0; i < n1; i++) {
      left[i] = arr[low + i]
    }
    for (let i = 0; i < n2; i++) {
      right[i] = arr[mid + 1 + i]
    }

    let i = 0
    let j = 0
    let k = low
    const newArr: number[] = []

    while (i < n1 && j < n2) {
      setAnalyzingIndices([low + i, mid + 1 + j])
      await sleep(animationSpeed)
      if (left[i] <= right[j]) {
        newArr[k] = left[i]
        i++
      } else {
        newArr[k] = right[j]
        j++
      }
      k++
    }

    while (i < n1) {
      newArr[k] = left[i]
      i++
      k++
    }

    while (j < n2) {
      newArr[k] = right[j]
      j++
      k++
    }

    for (let idx = low; idx <= high; idx++) {
      arr[idx] = newArr[idx]
    }

    setArray([...arr])
    setAnalyzingIndices([])
    setSortedIndices([
      ...sortedIndices,
      ...Array.from({ length: high - low + 1 }, (_, idx) => low + idx),
    ])
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
          title="Resetar Array"
          type="button"
          className="px-4 py-2 border-2 border-red-400 rounded-lg text-white hover:bg-red-400 focus:outline-none"
          onClick={resetArray}
          disabled={isSorting}
        >
          Resetar Array
        </button>
        <button
          title="Ordenar"
          type="button"
          className="px-4 py-2 border-2 border-yellow-400 rounded-lg text-white hover:bg-yellow-400 focus:outline-none"
          onClick={async () => {
            setIsSorting(true)
            await mergeSort([...array])
            setIsSorting(false)
          }}
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
            className={`h-12 flex items-center justify-center px-4 pb-10 pt-4 transition-all duration-300 ease-in-out text-white ${
              sortedIndices.includes(idx)
                ? 'bg-green-400'
                : analyzingIndices.includes(idx)
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
          {mergeSortCont}
        </ReactMarkdown>
      </article>
    </main>
  )
}
