import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

export type BooksList = {
  count: number
  next: string
  previous: null | number
  results: Array<{
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
  }>
}

const getList = async ({ pageParam }: { pageParam: string }) => {
  const response = await axios.get(pageParam)
  return response.data
}

export const useBooksList = (searchValue: string, selectedLanguages: string[], initialPage: string) => {
  const langParams = selectedLanguages.length > 0 ? `&languages=${selectedLanguages.join(',')}` : ''

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, isFetched } = useInfiniteQuery({
    queryKey: ['list', searchValue, selectedLanguages],
    queryFn: getList,
    getNextPageParam: (lastPage) => lastPage.next,
    initialPageParam: `https://gutendex.com/books/?page=${initialPage}&search=${searchValue}${langParams}`,
  })
  return {
    booksList: data?.pages.flatMap((page) => page.results) || [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isFetched,
  }
}
