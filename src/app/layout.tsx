import { NavMenu } from '@/components/nav-menu'
import { Footer } from '@/components/footer'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cytaty z filmów',
  description: 'Twoje źródło inspiracji filmowej',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <NavMenu />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

