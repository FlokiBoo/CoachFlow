'use client'

import { useState, useEffect } from 'react'
import styles from './Calendar.module.css'
import { getCalendarDays, saveCalendarDay } from '@/lib/calendar'

const DAYS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

function getMonday(offset = 0) {
  const now = new Date()
  const day = now.getDay() || 7
  const monday = new Date(now)
  monday.setDate(now.getDate() - day + 1 + offset * 7)
  monday.setHours(0, 0, 0, 0)
  return monday
}

function dateKey(d) {
  return d.toISOString().slice(0, 10)
}

function isToday(d) {
  const t = new Date()
  return d.getDate() === t.getDate() &&
    d.getMonth() === t.getMonth() &&
    d.getFullYear() === t.getFullYear()
}

export default function Calendar({ athlete, onBack }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [calData, setCalData] = useState({})
  const [hoveredDay, setHoveredDay] = useState(null)
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCalendar()
  }, [athlete.id])

  const loadCalendar = async () => {
    try {
      const data = await getCalendarDays(athlete.id)
      setCalData(data)
    } catch (err) {
      console.error('Error loading calendar:', err)
    } finally {
      setLoading(false)
    }
  }

  const monday = getMonday(weekOffset)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const weekLabel = monday.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) +
    ' – ' + sunday.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })

  const openModal = (key, dateLabel, mode) => {
    setModal({ key, dateLabel, mode })
  }

  const closeModal = () => setModal(null)

  const saveDay = async (key, data) => {
    const newData = { ...(calData[key] || {}), ...data }
    setCalData(prev => ({ ...prev, [key]: newData }))
    try {
      await saveCalendarDay(athlete.id, key, newData)
    } catch (err) {
      console.error('Error saving:', err)
      alert('Erreur sauvegarde: ' + JSON.stringify(err))
    }
    closeModal()
  }

  if (loading) return <div style={{ padding: '24px', color: 'var(--text3)' }}>Chargement...</div>

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>← Retour</button>
        <span className={styles.athleteName}>📅 {athlete.name}</span>
        <div className={styles.weekNav}>
          <button className={styles.navBtn} onClick={() => setWeekOffset(w => w - 1)}>‹</button>
          <span className={styles.weekLabel}>{weekLabel}</span>
          <button className={styles.navBtn} onClick={() => setWeekOffset(w => w + 1)}>›</button>
          <button className={styles.todayBtn} onClick={() => setWeekOffset(0)}>Aujourd'hui</button>
        </div>
      </div>

      <div
        className={styles.gridWrap}
        onWheel={e => {
          e.preventDefault()
          setWeekOffset(w => w + (e.deltaY > 0 ? 1 : -1))
        }}
      >
        <div className={styles.headerRow}>
          {days.map((d, i) => (
            <div key={i} className={`${styles.headerCell} ${isToday(d) ? styles.today : ''}`}>
              <div className={styles.headerDay}>{DAYS_FR[i]}</div>
              <div className={styles.headerDate}>{d.getDate()}</div>
            </div>
          ))}
        </div>

        <div className={styles.body}>
          {days.map((d, i) => {
            const key = dateKey(d)
            const data = calData[key] || {}
            return (
              <div
                key={i}
                className={`${styles.dayCol} ${isToday(d) ? styles.todayCol : ''}`}
                onMouseEnter={() => setHoveredDay(key)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                {hoveredDay === key && (
                  <div className={styles.hoverActions}>
                    <button onClick={() => openModal(key, d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }), 'session')}>+ Séance</button>
                    <button onClick={() => openModal(key, d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }), 'recup')}>💤 Récup</button>
                    <button onClick={() => openModal(key, d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }), 'note')}>📝 Note</button>
                  </div>
                )}

                {data.note && (
                  <div className={`${styles.note} ${!data.noteVisible ? styles.coachOnly : ''}`}>
                    <div className={styles.noteLabel}>{data.noteVisible ? '📝' : '🔒'}</div>
                    {data.note}
                  </div>
                )}

                {data.isRecup && <div className={styles.recup}>💤 Récup</div>}

                {data.sessionName && (
                  <div className={styles.session} onClick={() => openModal(key, '', 'session')}>
                    <div className={styles.sessionName}>{data.sessionName}</div>
                    {(data.blocks || []).slice(0, 3).map((b, j) => (
                      <div key={j} className={styles.sessionBlock}>{b}</div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {modal && (
        <DayModal
          modal={modal}
          data={calData[modal.key] || {}}
          onSave={saveDay}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

function DayModal({ modal, data, onSave, onClose }) {
  const [note, setNote] = useState(data.note || '')
  const [noteVisible, setNoteVisible] = useState(data.noteVisible || false)
  const [sessionName, setSessionName] = useState(data.sessionName || '')
  const [blocks, setBlocks] = useState((data.blocks || []).join('\n'))
  const [mode, setMode] = useState(modal.mode)

  const handleSave = () => {
    onSave(modal.key, {
      note,
      noteVisible,
      sessionName: mode === 'session' ? sessionName : data.sessionName,
      blocks: mode === 'session' ? blocks.split('\n').filter(Boolean) : data.blocks,
      isRecup: mode === 'recup',
    })
  }

  return (
<div className={styles.overlay}>      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <h3>{modal.dateLabel}</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalSection}>
            <div className={styles.modalLabel}>📝 Note</div>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Note de coaching..." rows={3} />
            <label className={styles.visibilityCheck}>
              <input type="checkbox" checked={noteVisible} onChange={e => setNoteVisible(e.target.checked)} />
              Montrer au sportif
            </label>
          </div>
          <div className={styles.modalSection}>
            <div className={styles.modalLabel}>Type</div>
            <div className={styles.modeButtons}>
              <button className={mode === 'session' ? styles.modeActive : ''} onClick={() => setMode('session')}>🏋 Séance</button>
              <button className={mode === 'recup' ? styles.modeActive : ''} onClick={() => setMode('recup')}>💤 Récup</button>
            </div>
          </div>
          {mode === 'session' && (
            <div className={styles.modalSection}>
              <div className={styles.modalLabel}>Nom de la séance</div>
              <input value={sessionName} onChange={e => setSessionName(e.target.value)} placeholder="Force Upper A..." />
              <div className={styles.modalLabel} style={{ marginTop: 8 }}>Exercices</div>
              <textarea value={blocks} onChange={e => setBlocks(e.target.value)} placeholder="Développé couché&#10;Squat..." rows={4} />
            </div>
          )}
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose}>Fermer</button>
          <button className={styles.saveBtn} onClick={handleSave}>✓ Enregistrer</button>
        </div>
      </div>
    </div>
  )
}