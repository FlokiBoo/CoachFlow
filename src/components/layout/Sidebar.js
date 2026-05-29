'use client'

import { useState } from 'react'
import styles from './Sidebar.module.css'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'athletes', label: 'Sportifs', icon: '👥' },
  { id: 'library', label: 'Bibliothèque', icon: '📚', section: 'Contenu' },
  { id: 'templates', label: 'Templates', icon: '📋' },
  { id: 'messages', label: 'Messages', icon: '💬', section: 'Communication' },
  { id: 'feedback', label: 'Feedback', icon: '⭐' },
]

export default function Sidebar({ activePage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>C</div>
        {!collapsed && <span className={styles.logoText}>CoachFlow</span>}
      </div>

      <nav className={styles.nav}>
        {navItems.map((item, i) => (
          <div key={item.id}>
            {item.section && !collapsed && (
              <div className={styles.navSep}>{item.section}</div>
            )}
            <button
              className={`${styles.navItem} ${activePage === item.id ? styles.active : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          </div>
        ))}
      </nav>

      <button
        className={styles.collapseBtn}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '▶' : '◀'}
      </button>
    </aside>
  )
}