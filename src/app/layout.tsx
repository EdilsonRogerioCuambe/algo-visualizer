import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Visualizar Algoritimos',
  description:
    'Pagina onde voce consiguira visualizar como os algoritmos funcionam',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className} !font-mono bg-[#202024] text-white`}>
        {children}
      </body>
    </html>
  )
}
