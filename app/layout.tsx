import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import LoadingPage from '../src/widgets/loading-page/LoadingPage'
import { GraphQLClientProvider } from '../src/graphql-client/graphql-client'
import { AppStateContextProvider } from '../src/state/StateContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cookbook',
  description: 'Cookbook application'
}

// Note: We need to perform dynamic imports for our providers since they cannot
// be built on the server.
const ThemeProvider = dynamic(() => import('../src/theme/ThemeProvider'), {
  ssr: false
})

const ViewSizeContextProvider = dynamic(() => import('../src/app-layout/ViewSizeProvider'), {
  ssr: false
})

const AppLayout = dynamic(() => import('../src/app-layout/AppLayout'), {
  ssr: false
})

const RecipeServiceProvider = dynamic(() => import('../src/recipes-service/RecipeServiceProvider'), {
  ssr: false
})

/**
 * This is a required top level element that enables modification of the initial HTML
 * returned from the server. The app components are wrapped with providers common to
 * all components. We need to wait for the window to be available to be able to return
 * our app with all the providers.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (typeof window === undefined) {
    return <LoadingPage />
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppStateContextProvider>
          <ThemeProvider>
            <ViewSizeContextProvider>
              <GraphQLClientProvider>
                <RecipeServiceProvider>
                  <AppLayout>{children}</AppLayout>
                </RecipeServiceProvider>
              </GraphQLClientProvider>
            </ViewSizeContextProvider>
          </ThemeProvider>
        </AppStateContextProvider>
      </body>
    </html>
  )
}
