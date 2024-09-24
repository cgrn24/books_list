import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useBookDetails } from '../../services/useBookDetails'
import styles from './Book.module.scss'
import cover from '../../assets/nocover.png'

export const Book = () => {
  const { id } = useParams()
  const bookDetails = useBookDetails(Number(id))
  const location = useLocation()
  const navigate = useNavigate()
  const { search, languages, page } = location.state || { search: '', languages: [], page: '' }
  const langParams = languages.length > 0 ? `&languages=${languages.join(',')}` : ''

  return (
    <div className={styles.bookDetailsContainer}>
      <div className={styles.bookHeader}>
        <img src={bookDetails?.formats['image/jpeg'] ? bookDetails.formats['image/jpeg'] : cover} alt={bookDetails?.title} className={styles.bookCover} />
        <div className={styles.bookInfo}>
          <h1 className={styles.bookTitle}>{bookDetails?.title}</h1>
          <p className={styles.authors}>Authors: {bookDetails?.authors.map((author) => author.name).join(', ')}</p>
          {bookDetails?.translators && <p className={styles.translators}>Translators: {bookDetails.translators.join(', ')}</p>}
          <p className={styles.genre}>Genre: {bookDetails?.subjects.join(', ')}</p>
          <p className={styles.languages}>Languages: {bookDetails?.languages.join(', ')}</p>
          <button className={styles.backButton} onClick={() => navigate(`/?page=${page}&search=${search}${langParams}`)}>
            Back to catalogue
          </button>
        </div>
      </div>
      <div className={styles.bookDetails}>
        <p className={styles.copyright}>Copyright: {bookDetails?.copyright ? 'Yes' : 'No'}</p>
        <p className={styles.downloads}>Downloads: {bookDetails?.download_count}</p>
      </div>
    </div>
  )
}
