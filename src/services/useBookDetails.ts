import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type BooksList = {
  id: number
  title: string
  authors: Array<{
    name: string
    birth_year: number
    death_year: number
  }>
  translators: Array<{
    name: string
    birth_year?: number
    death_year?: number
  }>
  subjects: Array<string>
  bookshelves: Array<string>
  languages: Array<string>
  copyright: boolean
  media_type: string
  formats: {
    'text/html': string
    'application/epub+zip': string
    'application/x-mobipocket-ebook': string
    'application/rdf+xml': string
    'image/jpeg': string
    'text/plain; charset=us-ascii': string
    'application/octet-stream': string
    'text/html; charset=utf-8'?: string
    'text/plain; charset=utf-8'?: string
    'text/plain; charset=iso-8859-1'?: string
    'text/html; charset=iso-8859-1'?: string
  }
  download_count: number
}

export const useBookDetails = (id: number) => {
  const getList = (): Promise<BooksList> => axios.get(`https://gutendex.com/books/${id}/`).then((res) => res.data)
  const { data: bookDetails } = useQuery({ queryKey: ['book', id], queryFn: getList })

  return bookDetails
}
