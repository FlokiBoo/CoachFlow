'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'

export default function Home() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text)' }}>
          {activePage === 'dashboard' && '📊 Dashboard'}
          {activePage === 'athletes' && '👥 Sportifs'}
          {activePage === 'library' && '📚 Bibliothèque'}
          {activePage === 'templates' && '📋 Templates'}
          {activePage === 'messages' && '💬 Messages'}
          {activePage === 'feedback' && '⭐ Feedback'}
        </h1>
        <p style={{ color: 'var(--text3)', marginTop: '8px' }}>
          Page en construction...
        </p>
      </main>
    </div>
  )
}