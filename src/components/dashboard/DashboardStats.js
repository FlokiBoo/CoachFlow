import styles from './DashboardStats.module.css'

export default function DashboardStats({ athletes, templates }) {
  const stats = [
    { label: 'Sportifs actifs', value: athletes.length, icon: '👥' },
    { label: 'Templates', value: templates.length, icon: '📋' },
    { label: 'Séances cette semaine', value: 0, icon: '🏋' },
  ]

  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.icon}>{stat.icon}</div>
          <div className={styles.value}>{stat.value}</div>
          <div className={styles.label}>{stat.label}</div>
        </div>
      ))}
    </div>
  )
}