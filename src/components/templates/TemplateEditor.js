'use client'

import { useState } from 'react'
import styles from './TemplateEditor.module.css'

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const emptyWeek = () => ({
  days: DAYS.map(() => ({ type: 'rest', name: '', content: '' }))
})

export default function TemplateEditor({ template, onBack, onSave }) {
  const [name, setName] = useState(template?.name || 'Nouveau template')
    const [weeks, setWeeks] = useState(
  Array.isArray(template?.weeks) ? template.weeks : [emptyWeek()]
)
const [currentWeek, setCurrentWeek] = useState(0)
  const addWeek = () => {
    setWeeks(w => [...w, emptyWeek()])
    setCurrentWeek(weeks.length)
  }

  const setDayType = (dayIdx, type) => {
    setWeeks(w => w.map((week, wi) => wi !== currentWeek ? week : {
      ...week,
      days: week.days.map((d, di) => di !== dayIdx ? d : { ...d, type })
    }))
  }

  const setDayField = (dayIdx, field, value) => {
    setWeeks(w => w.map((week, wi) => wi !== currentWeek ? week : {
      ...week,
      days: week.days.map((d, di) => di !== dayIdx ? d : { ...d, [field]: value })
    }))
  }

  const handleSave = () => {
    onSave({ name, weeks })
  }

  const week = weeks[currentWeek]

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>← Retour</button>
        <input
          className={styles.nameInput}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nom du template..."
        />
        <button className={styles.saveBtn} onClick={handleSave}>✓ Sauvegarder</button>
      </div>

      <div className={styles.weekTabs}>
        {weeks.map((_, i) => (
          <button
            key={i}
            className={`${styles.weekTab} ${i === currentWeek ? styles.activeTab : ''}`}
            onClick={() => setCurrentWeek(i)}
          >
            Semaine {i + 1}
          </button>
        ))}
        <button className={styles.addWeekBtn} onClick={addWeek}>+ Semaine</button>
      </div>

      <div className={styles.body}>
        {week.days.map((day, i) => (
          <div key={i} className={styles.dayCard}>
            <div className={styles.dayHeader}>
              <div className={styles.dayLabel}>{DAYS[i]}</div>
              <div className={styles.dayTypes}>
                <button
                  className={`${styles.typeBtn} ${day.type === 'session' ? styles.typeBtnActive : ''}`}
                  onClick={() => setDayType(i, 'session')}
                >Séance</button>
                <button
                  className={`${styles.typeBtn} ${day.type === 'recup' ? styles.typeBtnRecupActive : ''}`}
                  onClick={() => setDayType(i, 'recup')}
                >Récup</button>
                <button
                  className={`${styles.typeBtn} ${day.type === 'rest' ? styles.typeBtnActive : ''}`}
                  onClick={() => setDayType(i, 'rest')}
                >Repos</button>
              </div>
              {day.type === 'session' && (
                <input
                  className={styles.sessionNameInput}
                  placeholder="Nom de la séance..."
                  value={day.name}
                  onChange={e => setDayField(i, 'name', e.target.value)}
                />
              )}
            </div>
            {day.type === 'session' && (
              <textarea
                className={styles.contentArea}
                placeholder="Exercices, consignes..."
                value={day.content}
                onChange={e => setDayField(i, 'content', e.target.value)}
              />
            )}
            {day.type === 'recup' && (
              <div className={styles.recupLabel}>💤 Récupération</div>
            )}
            {day.type === 'rest' && (
              <div className={styles.restLabel}>— Repos</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}