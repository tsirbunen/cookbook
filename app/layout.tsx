import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { WithProviders } from './with-providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cookbook',
  description: 'Cookbook application'
}

/**
 * This is a required top level element that enables modification of the initial HTML
 * returned from the server. The app components are wrapped with providers common to
 * all components (except for the window size provider that needs the window not available
 * immediately).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WithProviders>{children}</WithProviders>
      </body>
    </html>
  )
}
