'use client'

import { useState } from 'react'
import styles from './MetricsPage.module.css'

const METRIC_SECTIONS = [
  {
    id: 'powerlifting', label: '🏋 Powerlifting', metrics: [
      { key: 'squat', name: 'Squat barre', unit: 'kg' },
      { key: 'bench', name: 'Bench Press', unit: 'kg' },
      { key: 'deadlift', name: 'Deadlift', unit: 'kg' },
      { key: 'front_squat', name: 'Front Squat', unit: 'kg' },
      { key: 'strict_press', name: 'Strict Press', unit: 'kg' },
      { key: 'rdl', name: 'Romanian Deadlift', unit: 'kg' },
    ]
  },
  {
    id: 'haltero', label: '⚡ Haltérophilie', metrics: [
      { key: 'snatch', name: 'Arraché (Snatch)', unit: 'kg' },
      { key: 'clean', name: 'Épaulé (Clean)', unit: 'kg' },
      { key: 'push_press', name: 'Push Press', unit: 'kg' },
      { key: 'ohsquat', name: 'Overhead Squat', unit: 'kg' },
    ]
  },
  {
    id: 'calisthenics', label: '🤸 Calisthenics', metrics: [
      { key: 'pullup_max', name: 'Max Tractions', unit: 'reps' },
      { key: 'pullup_w', name: 'Tractions Lestées', unit: 'kg' },
      { key: 'dip_max', name: 'Max Dips', unit: 'reps' },
      { key: 'pushup_max', name: 'Max Pompes', unit: 'reps' },
      { key: 'bmu', name: 'Bar Muscle Up', unit: 'reps' },
      { key: 'rmu', name: 'Ring Muscle Up', unit: 'reps' },
    ]
  },
  {
    id: 'cardio', label: '🏃 Cardio', metrics: [
      { key: 'run_1km', name: '1 km', unit: 'sec' },
      { key: 'run_5km', name: '5 km', unit: 'sec' },
      { key: 'run_10km', name: '10 km', unit: 'sec' },
      { key: 'run_semi', name: 'Semi-marathon', unit: 'sec' },
      { key: 'run_mara', name: 'Marathon', unit: 'sec' },
    ]
  },
  {
    id: 'jumps', label: '🦘 Sauts', metrics: [
      { key: 'broad_jump', name: 'Broad Jump', unit: 'cm' },
      { key: 'cmj', name: 'CMJ', unit: 'cm' },
      { key: 'squat_jump', name: 'Squat Jump (SJ)', unit: 'cm' },
    ]
  },
]

function formatTime(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

function epley(kg, reps) {
  if (reps === 1) return kg
  return Math.round(kg * (1 + reps / 30) * 10) / 10
}

export default function MetricsPage({ athletes }) {
  const [athId, setAthId] = useState(athletes[0]?.id || null)
  const [records, setRecords] = useState({})
  const [openSections, setOpenSections] = useState({ powerlifting: true })
  const [selectedMetric, setSelectedMetric] = useState(null)
  const [rmTab, setRmTab] = useState(1)

  const ath = athletes.find(a => a.id === athId)
  const athRecords = records[athId] || {}

  const getBest = (key) => {
    const recs = athRecords[key] || []
    if (!recs.length) return null
    return recs.reduce((best, r) => r.val > best.val ? r : best, recs[0])
  }

  const get1RM = (key) => {
    const real1 = (athRecords[key] || []).filter(r => r.rm === 1)
    const for2 = (athRecords[key] || []).filter(r => r.rm === 2).sort((a, b) => new Date(b.date) - new Date(a.date))
    const for3 = (athRecords[key] || []).filter(r => r.rm === 3).sort((a, b) => new Date(b.date) - new Date(a.date))

    if (real1.length) return { val: Math.max(...real1.map(r => r.val)), source: '1RM réel' }

    const cands = []
    if (for2.length) cands.push({ val: epley(for2[0].val, 2), date: for2[0].date, source: '1RM estimé (2RM)' })
    if (for3.length) cands.push({ val: epley(for3[0].val, 3), date: for3[0].date, source: '1RM estimé (3RM)' })

    if (cands.length) {
      cands.sort((a, b) => new Date(b.date) - new Date(a.date))
      return cands[0]
    }
    return null
  }

  const addRecord = (key, rm, val, date, note) => {
    setRecords(prev => ({
      ...prev,
      [athId]: {
        ...(prev[athId] || {}),
        [key]: [...((prev[athId] || {})[key] || []), { rm, val: parseFloat(val), date, note }]
      }
    }))
  }

  const toggleSection = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <h1 className={styles.title}>📊 Metrics</h1>
        <div className={styles.athSelector}>
          {athletes.map(a => (
            <button
              key={a.id}
              className={`${styles.athChip} ${athId === a.id ? styles.athChipActive : ''}`}
              onClick={() => setAthId(a.id)}
            >
              {a.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {selectedMetric ? (
        <MetricDetail
          metricKey={selectedMetric.key}
          metricName={selectedMetric.name}
          metricUnit={selectedMetric.unit}
          records={athRecords[selectedMetric.key] || []}
          rmTab={rmTab}
          setRmTab={setRmTab}
          onAdd={(rm, val, date, note) => addRecord(selectedMetric.key, rm, val, date, note)}
          onBack={() => setSelectedMetric(null)}
          rm1={get1RM(selectedMetric.key)}
        />
      ) : (
        <div className={styles.body}>
          {METRIC_SECTIONS.map(sec => (
            <div key={sec.id} className={styles.section}>
              <div className={styles.sectionHeader} onClick={() => toggleSection(sec.id)}>
                <span className={styles.sectionTitle}>{sec.label}</span>
                <span>{openSections[sec.id] ? '▲' : '▼'}</span>
              </div>
              {openSections[sec.id] && (
                <div className={styles.grid}>
                  {sec.metrics.map(m => {
                    const best = getBest(m.key)
                    const rm1 = m.unit === 'kg' ? get1RM(m.key) : null
                    return (
                      <div key={m.key} className={styles.cell} onClick={() => { setSelectedMetric(m); setRmTab(1) }}>
                        <div className={styles.cellName}>{m.name}</div>
                        {best ? (
                          <>
                            <div className={styles.cellVal}>
                              {m.unit === 'sec' ? formatTime(best.val) : best.val}
                              <span className={styles.cellUnit}>{m.unit !== 'sec' ? ' ' + m.unit : ''}</span>
                            </div>
                            {rm1 && <div className={styles.cellEst}>≈ {rm1.val}kg 1RM</div>}
                          </>
                        ) : (
                          <div className={styles.cellEmpty}>— Aucun record</div>
                        )}
                        <div className={styles.cellHint}>Voir progression →</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MetricDetail({ metricKey, metricName, metricUnit, records, rmTab, setRmTab, onAdd, onBack, rm1 }) {
  const [val, setVal] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [note, setNote] = useState('')
  const isKg = metricUnit === 'kg'
  const RMS = isKg ? [1, 2, 3, 4, 5] : ['max']
  const tabRecords = records.filter(r => r.rm === rmTab).sort((a, b) => new Date(b.date) - new Date(a.date))

  const handleAdd = () => {
    if (!val) return
    onAdd(rmTab, val, date, note)
    setVal('')
    setNote('')
  }

  return (
    <div className={styles.detailPage}>
      <div className={styles.detailTopbar}>
        <button className={styles.backBtn} onClick={onBack}>← Retour</button>
        <h2 className={styles.detailTitle}>{metricName}</h2>
      </div>

      {rm1 && (
        <div className={styles.hero}>
          <div className={styles.heroLabel}>1RM</div>
          <div className={styles.heroVal}>{rm1.val}<span className={styles.heroUnit}> kg</span></div>
          <div className={styles.heroSource}>{rm1.source}</div>
        </div>
      )}

      {isKg && (
        <div className={styles.rmTabs}>
          {RMS.map(rm => (
            <button
              key={rm}
              className={`${styles.rmTab} ${rmTab === rm ? styles.rmTabActive : ''} ${records.some(r => r.rm === rm) ? styles.rmTabHasData : ''}`}
              onClick={() => setRmTab(rm)}
            >
              {rm}RM
            </button>
          ))}
        </div>
      )}

      <div className={styles.addForm}>
        <input type="number" placeholder={metricUnit === 'sec' ? 'Secondes' : metricUnit === 'reps' ? 'Reps' : 'Kg'} value={val} onChange={e => setVal(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="text" placeholder="Note..." value={note} onChange={e => setNote(e.target.value)} />
        <button onClick={handleAdd}>+ Ajouter</button>
      </div>

      <div className={styles.histList}>
        <div className={styles.histHeader}>Historique</div>
        {tabRecords.length === 0 && <div className={styles.histEmpty}>Aucune donnée.</div>}
        {tabRecords.map((r, i) => (
          <div key={i} className={styles.histRow}>
            <span className={styles.histBadge}>{isKg ? rmTab + 'RM' : 'Max'}</span>
            <span className={styles.histDate}>{new Date(r.date + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: '2-digit' })}</span>
            <span className={styles.histVal}>{metricUnit === 'sec' ? formatTime(r.val) : r.val + ' ' + metricUnit}</span>
            {isKg && rmTab > 1 && <span className={styles.histEst}>≈ {epley(r.val, rmTab)}kg 1RM</span>}
            {r.note && <span className={styles.histNote}>{r.note}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}