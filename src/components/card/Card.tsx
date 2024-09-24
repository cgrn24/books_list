import { FC } from 'react'
import styles from './Card.module.scss'

type CardType = {
  title: string
  author: string
  image: string
  years?: number[]
  count?: number
  onClick: () => void
}

export const Card: FC<CardType> = ({ title, author, image, years, count, onClick }) => {
  return (
    <div className={styles.card}>
      <div>
        <img src={image} alt={title} className={styles.image} onClick={onClick} />
      </div>
      <div className={styles.title} onClick={onClick}>
        {title}
      </div>
      <div className={styles.author}>
        {author} ({years?.join(' - ')})
      </div>
      <div className={styles.count}>Downloads count: {count}</div>
    </div>
  )
}
