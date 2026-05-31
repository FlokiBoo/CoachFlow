'use client'

import { useState } from 'react'
import { exercises } from '@/data/exercises'
import styles from './ExerciseLibrary.module.css'

const TORQUE_COLORS = {
  TI: { bg: '#E1F5EE', color: '#0F6E56' },
  TE: { bg: '#FEE2E2', color: '#991B1B' },
  Mix: { bg: '#FEF3C7', color: '#92400E' },
}

export default function ExerciseLibrary() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('Tous')
  const [torqueFilter, setTorqueFilter] = useState('Tous')

  const cats = ['Tous', ...new Set(exercises.map(e => e.cat))]
  const torques = ['Tous', 'TI', 'TE', 'Mix']

  const filtered = exercises.filter(e => {
    const matchCat = catFilter === 'Tous' || e.cat === catFilter
    const matchTorque = torqueFilter === 'Tous' || e.torque === torqueFilter
    const matchSearch = !search || e.n.toLowerCase().includes(search.toLowerCase()) ||
      (e.muscles || []).some(m => m.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchTorque && matchSearch
  })

  const grouped = filtered.reduce((acc, e) => {
    const key = e.cat + ' — ' + e.group
    if (!acc[key]) acc[key] = []
    acc[key].push(e)
    return acc
  }, {})

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <h1 className={styles.title}>📚 Bibliothèque</h1>
        <span className={styles.count}>{filtered.length} exercices</span>
      </div>

      <div className={styles.filters}>
        <input
          className={styles.search}
          type="text"
          placeholder="Rechercher un exercice ou un muscle..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.chips}>
          {cats.map(c => (
            <button
              key={c}
              className={`${styles.chip} ${catFilter === c ? styles.chipActive : ''}`}
              onClick={() => setCatFilter(c)}
            >{c}</button>
          ))}
        </div>
        <div className={styles.chips}>
          {torques.map(t => (
            <button
              key={t}
              className={`${styles.chip} ${torqueFilter === t ? styles.chipActive : ''}`}
              onClick={() => setTorqueFilter(t)}
            >{t}</button>
          ))}
        </div>
      </div>

      <div className={styles.list}>
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group}>
            <div className={styles.groupHeader}>{group} <span>({items.length})</span></div>
            {items.map(e => (
              <div key={e.id} className={styles.item}>
                <div className={styles.itemLeft}>
                  <div className={styles.itemName}>{e.n}</div>
                  <div className={styles.itemMuscles}>{(e.muscles || []).join(', ')}</div>
                </div>
                <div className={styles.itemRight}>
                  {e.action && <span className={styles.actionBadge}>{e.action}</span>}
                  {e.torque && (
                    <span className={styles.torqueBadge} style={{
                      background: TORQUE_COLORS[e.torque]?.bg,
                      color: TORQUE_COLORS[e.torque]?.color
                    }}>{e.torque}</span>
                  )}
                  {e.nature && <span className={styles.natureBadge}>{e.nature}</span>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}