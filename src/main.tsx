import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { List } from './pages/list/List'
import { Book } from './pages/book/Book'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/book/:id' element={<Book />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)
