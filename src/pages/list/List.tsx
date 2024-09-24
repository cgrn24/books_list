import { useEffect } from 'react'
import { Card } from '../../components/card/Card'
import { useBooksList } from '../../services/useBooksList'
import styles from './List.module.scss'

export const List = () => {
  const { booksList, fetchNextPage, hasNextPage, isFetchingNextPage } = useBooksList()

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <div className={styles.booksListContainer}>
      <h1 className={styles.title}>Books List</h1>
      <div className={styles.toolbar}> {/* Тут будет компонент поиска */} </div>
      <div className={styles.cardsGrid}>
        {booksList?.map((item) => {
          const authorName = item.authors?.[0]?.name
          const imageUrl = item.formats?.['image/jpeg']
          const birthYear = item.authors?.[0]?.birth_year
          const deathYear = item.authors?.[0]?.death_year

          return (
            <Card
              key={item.id}
              author={authorName}
              image={imageUrl}
              title={item.title}
              id={item.id}
              years={[birthYear, deathYear]}
              count={item.download_count}
            />
          )
        })}
      </div>
      {isFetchingNextPage && <p>Loading more books...</p>}
    </div>
  )
}
