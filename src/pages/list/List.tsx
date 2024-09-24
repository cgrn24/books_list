import { Card } from '../../components/card/Card'
import { useBooksList } from '../../services/useBooksList'
import styles from './List.module.scss'

export const List = () => {
  const booksList = useBooksList()
  return (
    <div className={styles.booksListContainer}>
      <h1 className={styles.title}>Books List</h1>
      <div className={styles.toolbar}> {/* Тут будет компонент поиска */} </div>
      <div className={styles.cardsGrid}>
        {booksList?.map((item) => {
          return (
            <Card
              author={item.authors[0].name}
              image={item.formats['image/jpeg']}
              title={item.title}
              id={item.id}
              years={[item.authors[0].birth_year, item.authors[0].death_year]}
              count={item.download_count}
            />
          )
        })}
      </div>
    </div>
  )
}
