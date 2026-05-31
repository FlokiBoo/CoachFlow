'use client'

import { useState } from 'react'
import styles from './AthleteProfile.module.css'

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function AthleteProfile({ athlete, onBack }) {
  const [tab, setTab] = useState('info')

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>← Retour</button>
        <h2 className={styles.title}>{athlete.name}</h2>
        <button className={styles.saveBtn}>✓ Enregistrer</button>
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
                  <input type="text" defaultValue={athlete.name} />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input type="email" defaultValue={athlete.email} />
                </div>
                <div className={styles.field}>
                  <label>Téléphone</label>
                  <input type="tel" defaultValue={athlete.phone} />
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Données physiques</div>
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label>Âge</label>
                  <input type="number" defaultValue={athlete.age} />
                </div>
                <div className={styles.field}>
                  <label>Taille (cm)</label>
                  <input type="number" defaultValue={athlete.height} />
                </div>
                <div className={styles.field}>
                  <label>Poids (kg)</label>
                  <input type="number" defaultValue={athlete.weight} />
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