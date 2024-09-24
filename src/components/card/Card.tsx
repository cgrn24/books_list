import { FC, useEffect, useState } from 'react'
import styles from './Card.module.scss'

type CardType = {
  title: string
  author: string
  image: string
  years?: number[]
  count?: number
  id: number
  onClick: () => void
}

export const Card: FC<CardType> = ({ id, title, author, image, years, count, onClick }) => {
  const [isVisited, setIsVisited] = useState(false)

  useEffect(() => {
    const visitedBooks = JSON.parse(localStorage.getItem('visitedBooks') || '[]')
    if (visitedBooks.includes(id)) {
      setIsVisited(true)
    }
  }, [id])

  const handleClick = () => {
    const visitedBooks = JSON.parse(localStorage.getItem('visitedBooks') || '[]')
    if (!visitedBooks.includes(id)) {
      visitedBooks.push(id)
      localStorage.setItem('visitedBooks', JSON.stringify(visitedBooks))
    }
    onClick()
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} onClick={handleClick} />
      </div>
      <div className={`${styles.title} ${isVisited ? styles.visited : ''}`} onClick={handleClick}>
        {title}
      </div>
      <div className={styles.author}>
        {author} ({years?.join(' - ')})
      </div>
      <div className={styles.count}>Downloads count: {count}</div>
    </div>
  )
}
