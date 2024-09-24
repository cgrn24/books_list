import { FC } from 'react'
import styles from './Card.module.scss'
import { Link } from 'react-router-dom'

type CardType = {
  title: string
  author: string
  image: string
  id: number
  years?: number[]
  count?: number
}

export const Card: FC<CardType> = ({ title, author, image, id, years, count }) => {
  return (
    <div className={styles.card}>
      <div>
        <Link to={`/book/${id}`}>
          <img src={image} alt={title} className={styles.image} />
        </Link>
      </div>
      <Link to={`/book/${id}`}>
        <div className={styles.title}>{title}</div>
      </Link>
      <div className={styles.author}>
        {author} ({years?.join(' - ')})
      </div>
      <div className={styles.count}>{count}</div>
    </div>
  )
}
