import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import LoadingPage from '../src/components/loading/LoadingPage'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cookbook',
  description: 'Cookbook application'
}

const ThemeProvider = dynamic(() => import('../src/theme/ThemeProvider'), {
  ssr: false
})

const ViewSizeContextProvider = dynamic(() => import('../src/app-layout/ViewSizeProvider'), {
  ssr: false
})

const AppLayout = dynamic(() => import('../src/app-layout/AppLayout'), {
  ssr: false
})

/**
 * This is a required top level element that enables modification of the initial HTML
 * returned from the server. The app components are wrapped with providers common to
 * all components. We need to wait for the window to be available.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (typeof window === undefined) {
    return <LoadingPage />
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ViewSizeContextProvider>
            <AppLayout>{children}</AppLayout>
          </ViewSizeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
