import { RouterProvider } from 'react-router-dom'
import ViewSizeContextProvider from './contexts/ViewSizeContext'
import ThemeProvider from './theme/ThemeProvider'
import { router } from './components/navigation/router/router'

const App = () => {
  return (
    <ThemeProvider>
      <ViewSizeContextProvider>
        <RouterProvider router={router} />
      </ViewSizeContextProvider>
    </ThemeProvider>
  )
}

export default App
