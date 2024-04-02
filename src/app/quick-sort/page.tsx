'use client'
import React, { useState, useEffect, useCallback } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'

const quickSortCont = `
## Quick Sort

Quick Sort é um algoritmo de classificação eficiente e amplamente utilizado que utiliza a estratégia de divisão e conquista para ordenar uma lista de elementos. O algoritmo seleciona um elemento como pivô e rearranja os elementos da lista de forma que
os elementos menores que o pivô fiquem à sua esquerda e os elementos maiores fiquem à sua direita. Em seguida, o algoritmo é aplicado recursivamente às sublistas à esquerda e à direita do pivô.

### Funcionamento

1. O algoritmo seleciona um elemento como pivô da lista. Esse pivô pode ser escolhido de várias maneiras, como o primeiro, o último ou um elemento aleatório da lista.
2. A lista é particionada de forma que os elementos menores que o pivô fiquem à esquerda e os elementos maiores fiquem à direita.
3. O pivô é colocado na sua posição correta na lista ordenada.
4. O algoritmo é aplicado recursivamente às sublistas à esquerda e à direita do pivô.

### Implementação em C

\`\`\`c
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
\`\`\`

### Complexidade de Tempo

- **Melhor Caso:** O(n log n)
- **Caso Médio:** O(n log n)
- **Pior Caso:** O(n^2)
  - O pior caso ocorre quando o pivô escolhido é o menor ou o maior elemento da lista, resultando em uma partição desequilibrada.

### Considerações Adicionais

- **Estabilidade:** O Quick Sort não é um algoritmo estável, pois a troca de elementos pode alterar a ordem relativa dos elementos iguais.
- **In-Place:** O Quick Sort é um algoritmo in-place, pois a ordenação é realizada diretamente na lista original.
- **Adaptação:** O Quick Sort pode ser adaptado para usar uma estratégia de seleção de pivô mais eficiente, como a escolha do pivô mediano de três elementos.
`

export default function QuickSort() {
  const [array, setArray] = useState<number[]>([])
  const [animationSpeed, setAnimationSpeed] = useState(250)
  const [isSorting, setIsSorting] = useState(false)
  const [arraySize, setArraySize] = useState(15)
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])
  const [swappingIndices, setSwappingIndices] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])

  const resetArray = useCallback(() => {
    const newArray: number[] = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1)
    }
    setArray(newArray)
    setHighlightedIndices([])
    setSwappingIndices([])
    setSortedIndices([])
  }, [arraySize])

  useEffect(() => {
    resetArray()
  }, [arraySize, resetArray])

  const quickSort = async (arr: number[], low: number, high: number) => {
    setIsSorting(true)
    if (low < high) {
      const pi = await partition(arr, low, high)
      await Promise.all([
        quickSort(arr, low, pi - 1),
        quickSort(arr, pi + 1, high),
      ])
    }
    setIsSorting(false)
  }

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      setHighlightedIndices([j, high])
      await sleep(animationSpeed)

      if (arr[j] < pivot) {
        i++
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
        setArray([...arr])
      }
    }

    const temp = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp
    setArray([...arr])
    setSortedIndices([...sortedIndices, i + 1])

    return i + 1
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
          className="px-4 py-2 border-red-400 border-2 rounded-lg text-white hover:bg-red-500 focus:outline-none"
          onClick={resetArray}
          disabled={isSorting}
        >
          Resetar Array
        </button>
        <button
          className="px-4 py-2 border-2 border-yellow-400 text-white rounded hover:bg-yellow-500 focus:outline-none"
          onClick={() => {
            quickSort([...array], 0, array.length - 1)
          }}
          disabled={isSorting}
        >
          Ordenar
        </button>
        <label className="flex items-center">
          Velocidade:
          <input
            type="range"
            min={1}
            max={500}
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
            max={20}
            value={arraySize}
            onChange={handleChangeSize}
            className="ml-2 w-16 outline-none border-none bg-gray-800 text-white p-1 rounded-lg"
          />
        </label>
      </div>
      <div className="flex items-end justify-center space-x-1">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`h-12 flex items-center justify-center px-4 pb-10 pt-4 transition-all duration-300 ease-in-out text-white ${
              highlightedIndices.includes(idx)
                ? 'bg-yellow-400'
                : sortedIndices.includes(idx)
                  ? 'bg-green-400'
                  : swappingIndices.includes(idx)
                    ? 'bg-red-400'
                    : 'bg-blue-400'
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
          {quickSortCont}
        </ReactMarkdown>
      </article>
    </main>
  )
}
