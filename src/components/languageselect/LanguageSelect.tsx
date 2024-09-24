import React, { useState } from 'react'
import styles from './LanguageSelect.module.scss'

type LanguageSelectProps = {
  selectedLanguages: string[]
  onChange: (languages: string[]) => void
}

const availableLanguages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'Spanish', value: 'es' },
  { label: 'Russian', value: 'ru' },
]

export const LanguageSelect: React.FC<LanguageSelectProps> = ({ selectedLanguages, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleLanguageSelect = (language: string) => {
    const newSelectedLanguages = selectedLanguages.includes(language) ? selectedLanguages.filter((lang) => lang !== language) : [...selectedLanguages, language]
    onChange(newSelectedLanguages)
  }

  return (
    <div className={styles.languageSelectContainer}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        Select Languages
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {availableLanguages.map((language) => (
            <label key={language.value} className={styles.option}>
              <input
                type='checkbox'
                checked={selectedLanguages.includes(language.value)}
                onChange={() => handleLanguageSelect(language.value)}
                className={styles.checkbox}
              />
              {language.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
