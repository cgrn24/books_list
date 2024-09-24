import { FC } from 'react'
import styles from './Toolbar.module.scss'

type Props = {
  value: string
  setValue: (value: string) => void
}

export const Toolbar: FC<Props> = ({ value, setValue }) => {
  return <input className={styles.search} type='text' value={value} onChange={(e) => setValue(e.target.value)} />
}
