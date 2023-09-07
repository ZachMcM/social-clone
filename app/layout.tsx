import { Provider } from '@/components/providers/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Social Clone',
  description: 'A basic social media app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex w-full min-h-screen'>
        <Provider>
          {children}
          <Toaster/>
        </Provider>
      </body>
    </html>
  )
}
