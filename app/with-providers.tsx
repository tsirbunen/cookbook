'use client'
import ThemeProvider from '../src/theme/ThemeProvider'

export function WithProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
