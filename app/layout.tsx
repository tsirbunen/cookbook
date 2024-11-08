import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import LoadingPage from '../src/widgets/loading-page/LoadingPage'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cookbook',
  description: 'Cookbook application'
}

// Note: We need to perform dynamic imports for - at least for some of - our providers since
// they cannot be built on the server, so we dynamically import them all.

const AppStateContextProvider = dynamic(() => import('../src/state/StateContextProvider'), {
  ssr: false
})

const GraphQLClientProvider = dynamic(() => import('../src/api-service/graphql-client/graphql-client'), {
  ssr: false
})

const ThemeProvider = dynamic(() => import('../src/theme/ThemeProvider'), {
  ssr: false
})

const ViewSizeContextProvider = dynamic(() => import('../src/layout/view-size-service/ViewSizeProvider'), {
  ssr: false
})

const MainAppLayout = dynamic(() => import('../src/layout/main-app-layout/MainAppLayout'), {
  ssr: false
})

const ApiServiceProvider = dynamic(() => import('../src/api-service/ApiServiceProvider'), {
  ssr: false
})

const CookingProvider = dynamic(() => import('../src/app-pages/cook/page/CookingProvider'), {
  ssr: false
})

const SearchRecipesProvider = dynamic(() => import('../src/app-pages/search/page/SearchRecipesProvider'), {
  ssr: false
})

const SoundProvider = dynamic(() => import('../src/sounds/SoundProvider'), {
  ssr: false
})

const LocalStorageProvider = dynamic(() => import('../src/state/LocalStorageProvider'), {
  ssr: false
})

const ToastServiceProvider = dynamic(() => import('../src/toast-service/ToastServiceProvider'), {
  ssr: false
})

/**
 * A required top level element that enables modification of the initial HTML returned
 * from the server. Here the app components are wrapped with providers common to all
 * components. We need to wait for the window to be available to be able to return
 * our app with all the providers.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // biome-ignore lint/suspicious/useValidTypeof: Needs to be like this
  if (typeof window === undefined) {
    return <LoadingPage />
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppStateContextProvider>
          <LocalStorageProvider>
            <ThemeProvider>
              <ToastServiceProvider>
                <ViewSizeContextProvider>
                  <GraphQLClientProvider>
                    <ApiServiceProvider>
                      <SearchRecipesProvider>
                        <CookingProvider>
                          <SoundProvider>
                            <MainAppLayout>{children}</MainAppLayout>
                          </SoundProvider>
                        </CookingProvider>
                      </SearchRecipesProvider>
                    </ApiServiceProvider>
                  </GraphQLClientProvider>
                </ViewSizeContextProvider>
              </ToastServiceProvider>
            </ThemeProvider>
          </LocalStorageProvider>
        </AppStateContextProvider>
      </body>
    </html>
  )
}
