import { useParams } from 'react-router-dom'
import { useBookDetails } from '../../services/useBookDetails'
import styles from './Book.module.scss'

export const Book = () => {
  const { id } = useParams()
  const bookDetails = useBookDetails(Number(id))
  console.log(bookDetails)

  return (
    <div className={styles.bookDetailsContainer}>
      <div className={styles.bookHeader}>
        <img src={bookDetails?.formats['image/jpeg']} alt={bookDetails?.title} className={styles.bookCover} />
        <div className={styles.bookInfo}>
          <h1 className={styles.bookTitle}>{bookDetails?.title}</h1>
          <p className={styles.authors}>Authors: {bookDetails?.authors.map((author) => author.name).join(', ')}</p>
          {bookDetails?.translators && <p className={styles.translators}>Translators: {bookDetails.translators.join(', ')}</p>}
          <p className={styles.genre}>Genre: {bookDetails?.subjects.join(', ')}</p>
          <p className={styles.languages}>Languages: {bookDetails?.languages.join(', ')}</p>
        </div>
      </div>
      <div className={styles.bookDetails}>
        <p className={styles.copyright}>Copyright: {bookDetails?.copyright ? 'Yes' : 'No'}</p>
        <p className={styles.downloads}>Downloads: {bookDetails?.download_count}</p>
      </div>
    </div>
  )
}
