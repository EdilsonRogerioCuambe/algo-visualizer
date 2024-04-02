import Image, { StaticImageData } from 'next/image'

interface AlgoCardProps {
  name: string
  image: StaticImageData
  description: string
}

export default function AlgoCard({ name, image, description }: AlgoCardProps) {
  return (
    <main className="bg-[#121214] rounded-lg justify-center items-center shadow-lg p-4">
      <div className="flex justify-center relative h-32 w-32 items-center">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{description}</p>
    </main>
  )
}
