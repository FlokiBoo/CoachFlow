'use client'

import { useState } from 'react'
import styles from './TemplatesList.module.css'

export default function TemplatesList({ templates, onSelect, onCreate }) {
  return (
    <div className={styles.split}>
      <div className={styles.listPanel}>
        <div className={styles.listHeader}>
          <h2>Templates</h2>
          <button className={styles.newBtn} onClick={onCreate}>+ Nouveau</button>
        </div>
        <div className={styles.list}>
          {templates.length === 0 && (
            <div className={styles.empty}>Aucun template.<br />Crée ton premier !</div>
          )}
          {templates.map(t => (
            <div key={t.id} className={styles.item} onClick={() => onSelect(t)}>
              <div className={styles.itemName}>{t.name}</div>
              <div className={styles.itemMeta}>{t.weeks} semaine{t.weeks > 1 ? 's' : ''}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.emptyEditor}>
        <div style={{ fontSize: '32px' }}>📋</div>
        <div>Sélectionne ou crée un template</div>
      </div>
    </div>
  )
}