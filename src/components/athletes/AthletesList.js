'use client'

import { useState } from 'react'
import styles from './AthletesList.module.css'

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function AthletesList({ athletes, onSelect, onNew }) {  const [search, setSearch] = useState('')

  const filtered = athletes.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <h1 className={styles.title}>👥 Sportifs</h1>
<button className={styles.addBtn} onClick={onNew}>+ Nouveau sportif</button>      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Rechercher un sportif..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.list}>
        {filtered.map(a => (
          <div key={a.id} className={styles.row} onClick={() => onSelect(a)}>
            <div className={styles.avatar}>{initials(a.name)}</div>
            <div className={styles.info}>
              <div className={styles.name}>{a.name}</div>
              <div className={styles.meta}>
                {[a.age && `${a.age} ans`, a.height && `${a.height} cm`, a.weight && `${a.weight} kg`]
                  .filter(Boolean).join(' · ')}
                {a.email && ` · ${a.email}`}
              </div>
            </div>
            <div className={styles.arrow}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}