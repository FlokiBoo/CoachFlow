'use client'

import { useState } from 'react'
import styles from './AthleteProfile.module.css'

export default function AthleteProfile({ athlete, onBack, onCalendar, onSave, onDelete }) {
  const [tab, setTab] = useState('info')
  const [name, setName] = useState(athlete.name || '')
  const [email, setEmail] = useState(athlete.email || '')
  const [phone, setPhone] = useState(athlete.phone || '')
  const [age, setAge] = useState(athlete.age || '')
  const [height, setHeight] = useState(athlete.height || '')
  const [weight, setWeight] = useState(athlete.weight || '')

  const handleSave = () => {
    if (!onSave) return
    onSave({
      name,
      email,
      phone,
      age: parseInt(age) || null,
      height: parseInt(height) || null,
      weight: parseFloat(weight) || null,
      objectives: athlete.objectives || [],
      secondaryObjectives: athlete.secondary_objectives || [],
      limitations: athlete.limitations || [],
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>← Retour</button>
        <h2 className={styles.title}>{name}</h2>
        <button className={styles.calBtn} onClick={onCalendar}>📅 Calendrier</button>
        <button className={styles.saveBtn} onClick={handleSave}>✓ Enregistrer</button>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'info' ? styles.activeTab : ''}`} onClick={() => setTab('info')}>👤 Infos</button>
        <button className={`${styles.tab} ${tab === 'diagnostic' ? styles.activeTab : ''}`} onClick={() => setTab('diagnostic')}>🔬 Diagnostic</button>
        <button className={`${styles.tab} ${tab === 'articulaire' ? styles.activeTab : ''}`} onClick={() => setTab('articulaire')}>🦴 Test Articulaire</button>
      </div>

      <div className={styles.body}>
        {tab === 'info' && (
          <div className={styles.infoGrid}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Informations personnelles</div>
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label>Nom complet</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Téléphone</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Données physiques</div>
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label>Âge</label>
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Taille (cm)</label>
                  <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Poids (kg)</label>
                  <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>🎯 Objectif principal</div>
              <div className={styles.objList}>
                {(athlete.objectives || []).map((obj, i) => (
                  <div key={i} className={styles.objItem}>{obj}</div>
                ))}
                <button className={styles.addBtn}>+ Ajouter un objectif</button>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>⚠️ Limitations</div>
              <div className={styles.objList}>
                {(athlete.limitations || []).map((lim, i) => (
                  <div key={i} className={styles.objItem}>{lim}</div>
                ))}
                <button className={styles.addBtn}>+ Ajouter une limitation</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'diagnostic' && (
          <div className={styles.comingSoon}>🔬 Diagnostic — En construction</div>
        )}

        {tab === 'articulaire' && (
          <div className={styles.comingSoon}>🦴 Test Articulaire — En construction</div>
        )}
      </div>
    </div>
  )
}