'use client'
import React, { useState, useEffect, useCallback } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'

const bubbleSortCont = `
## Bubble Sort

Bubble Sort é um algoritmo de classificação simples e intuitivo que percorre repetidamente a lista de elementos a serem ordenados, comparando pares adjacentes e trocando-os se estiverem na ordem errada. O algoritmo passa várias vezes pela lista até que nenhum elemento precise ser trocado, o que indica que a lista está ordenada.

### Funcionamento

1. Inicialmente, o algoritmo começa comparando o primeiro e o segundo elemento da lista. Se o primeiro elemento for maior que o segundo, eles são trocados.
2. Em seguida, o algoritmo compara o segundo e o terceiro elemento, e assim por diante, percorrendo a lista de um lado para o outro.
3. Cada passagem através da lista coloca o maior elemento encontrado durante essa passagem na sua posição correta.
4. Esse processo é repetido até que nenhum elemento precise ser trocado, o que indica que a lista está ordenada.

### Implementação em C

${'```c'}
void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
${'```'}


### Complexidade de Tempo

- **Melhor Caso:** O(n)
  - O melhor caso ocorre quando a lista já está ordenada. Nesse caso, o algoritmo passará pela lista uma única vez e não realizará nenhuma troca, resultando em uma complexidade de tempo linear.
- **Caso Médio:** O(n^2)
- **Pior Caso:** O(n^2)
  - O pior caso ocorre quando a lista está ordenada de forma inversa, pois o algoritmo terá que realizar uma série de trocas em cada passagem pela lista.

### Considerações Adicionais

- **Estabilidade:** O Bubble Sort é um algoritmo estável, o que significa que a ordem relativa dos elementos iguais não é alterada durante a ordenação.
- **In-Place:** O Bubble Sort é um algoritmo in-place, pois requer uma quantidade constante de espaço adicional para realizar a ordenação, além do espaço ocupado pela lista original.
- **Adaptação:** O Bubble Sort pode ser adaptado para parar o processo de ordenação caso nenhuma troca seja realizada em uma determinada passagem pela lista, o que indica que a lista está ordenada.
`

export default function BubbleSort() {
  const [array, setArray] = useState<number[]>([])
  const [animationSpeed, setAnimationSpeed] = useState(100)
  const [isSorting, setIsSorting] = useState(false)
  const [arraySize, setArraySize] = useState(30)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [swappingIndices, setSwappingIndices] = useState<number[]>([])

  const resetArray = useCallback(() => {
    const newArray: number[] = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1)
    }
    setArray(newArray)
    setSortedIndices([])
    setSwappingIndices([])
  }, [arraySize])

  useEffect(() => {
    resetArray()
  }, [arraySize, resetArray])

  const bubbleSort = async () => {
    setIsSorting(true)
    const arr = [...array]
    const n = arr.length
    const sorted = []
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setHighlightedIndex(j)
        await sleep(animationSpeed)
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          setArray([...arr])
          setSwappingIndices([j, j + 1])
        }
      }
      sorted.unshift(arr[n - 1 - i])
      setSortedIndices([...sorted])
    }
    setHighlightedIndex(null)
    setSwappingIndices([])
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
          title="Resetar Array"
          type="button"
          className="px-4 py-2 border-2 border-red-400 rounded-lg text-white"
          onClick={resetArray}
          disabled={isSorting}
        >
          Resetar Array
        </button>
        <button
          title="Ordenar Array"
          type="button"
          className="px-4 py-2 border-2 border-yellow-400 rounded-lg text-white"
          onClick={bubbleSort}
          disabled={isSorting}
        >
          Ordenar
        </button>
        <label className="flex items-center">
          Velocidade:
          <input
            type="range"
            min={10}
            max={500}
            value={animationSpeed}
            onChange={handleChangeSpeed}
            className="ml-2 w-32 outline-none bg-gray-800 text-white p-1 rounded-lg"
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
            className={`h-12 text-white px-2 pt-2 pb-10 text-center transition-all duration-300 ease-in-out ${
              sortedIndices.includes(value)
                ? 'bg-green-400'
                : swappingIndices.includes(idx)
                  ? 'bg-purple-400'
                  : highlightedIndex === idx
                    ? 'bg-red-400'
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
          {bubbleSortCont}
        </ReactMarkdown>
      </article>
    </main>
  )
}
