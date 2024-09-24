import { useEffect, useState } from 'react'
import { Card } from '../../components/card/Card'
import { useBooksList } from '../../services/useBooksList'
import styles from './List.module.scss'
import { Toolbar } from '../../components/toolbar/Toolbar'
import { useDebounce } from '../../services/useDebounce'
import { LanguageSelect } from '../../components/languageselect/LanguageSelect'
import cover from '../../assets/nocover.png'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const List = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialPage = searchParams.get('page') || ''
  const initialLanguages = searchParams.get('languages')?.split(',') || []
  const navigate = useNavigate()

  const [page, setPage] = useState(initialPage)
  const [searchValue, setSearchValue] = useState(initialSearch)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(initialLanguages)
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const { booksList, fetchNextPage, hasNextPage, isFetchingNextPage } = useBooksList(debouncedSearchValue, selectedLanguages, initialPage)

  useEffect(() => {
    setSearchParams({
      page: page,
      search: searchValue,
      languages: selectedLanguages.join(','),
    })
  }, [searchValue, selectedLanguages, setSearchParams, page])

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage().then(() => {
          setPage((prevPage) => String(Number(prevPage) + 1))
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <div className={styles.booksListContainer}>
      <h1 className={styles.title}>Books List</h1>
      <div className={styles.toolbar}>
        <LanguageSelect selectedLanguages={selectedLanguages} onChange={setSelectedLanguages} />
        <Toolbar value={searchValue} setValue={setSearchValue} />
      </div>
      <div className={styles.cardsGrid}>
        {booksList?.map((item) => {
          const authorName = item.authors?.[0]?.name
          const imageUrl = item.formats?.['image/jpeg'] ? item.formats['image/jpeg'] : cover
          const birthYear = item.authors?.[0]?.birth_year
          const deathYear = item.authors?.[0]?.death_year

          return (
            <Card
              key={item.id}
              author={authorName}
              image={imageUrl}
              title={item.title}
              years={[birthYear, deathYear]}
              count={item.download_count}
              onClick={() => navigate(`/book/${item.id}`, { state: { search: searchValue, languages: selectedLanguages, page: initialPage } })}
            />
          )
        })}
      </div>
      {isFetchingNextPage && <p>Loading more books...</p>}
    </div>
  )
}
