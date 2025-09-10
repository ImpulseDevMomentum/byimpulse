import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio, Start working with me!',
  description: "My Portfolio, feel free to hit me up!",
  icons: {
    icon: '/me.jpg',
  },
  keywords: ['portfolio', 'developer', 'designer', 'react', 'nextjs', 'typescript', 'dark theme'],
  authors: [{ name: 'Your Name' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <div className="min-h-screen bg-black">
          {children}
        </div>
      </body>
    </html>
  )
}