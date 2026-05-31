import styles from './AthleteList.module.css'

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function AthleteList({ athletes, onSelect }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>👥 Tous les sportifs</span>
        <span className={styles.count}>{athletes.length}</span>
      </div>
      <div className={styles.list}>
        {athletes.map(a => (
          <div key={a.id} className={styles.row} onClick={() => onSelect(a)}>
            <div className={styles.avatar}>{initials(a.name)}</div>
            <div className={styles.info}>
              <div className={styles.name}>{a.name}</div>
              <div className={styles.meta}>
                {[a.age && `${a.age} ans`, a.weight && `${a.weight} kg`]
                  .filter(Boolean).join(' · ')}
              </div>
            </div>
            <div className={styles.arrow}>›</div>
          </div>
        ))}
      </div>
    </div>
  )
}