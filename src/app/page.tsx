import Link from 'next/link'
import sort from '@/assets/sort.png'
import bubble from '@/assets/bubble.png'
import merge from '@/assets/merge.png'
import insert from '@/assets/insert.png'
import selection from '@/assets/selection.png'
import AlgoCard from '@/components/algo.card'

export default function Home() {
  return (
    <main className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 p-4">
      <Link href="/bubble-sort">
        <AlgoCard
          name="Bubble Sort"
          image={bubble}
          description="Bubble Sort é um algoritmo de ordenação simples."
        />
      </Link>
      <Link href="/quick-sort">
        <AlgoCard
          name="Quick Sort"
          image={sort}
          description="Quick Sort é um algoritmo de ordenação eficiente."
        />
      </Link>
      <Link href="/merge-sort">
        <AlgoCard
          name="Merge Sort"
          image={merge}
          description="Merge Sort é um algoritmo de ordenação estável."
        />
      </Link>
      <Link href="/insertion-sort">
        <AlgoCard
          name="Insertion Sort"
          image={insert}
          description="Insertion Sort é um algoritmo de ordenação simples."
        />
      </Link>
      <Link href="/selection-sort">
        <AlgoCard
          name="Selection Sort"
          image={selection}
          description="Selection Sort é um algoritmo de ordenação simples."
        />
      </Link>
    </main>
  )
}
