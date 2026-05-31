'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import DashboardStats from '@/components/dashboard/DashboardStats'
import AthleteList from '@/components/dashboard/AthleteList'
import { athletes } from '@/data/athletes'
import { templates } from '@/data/templates'

export default function Home() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main style={{ flex: 1, overflow: 'auto', background: 'var(--bg2)' }}>

        {activePage === 'dashboard' && (
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '600' }}>📊 Dashboard</h1>
              <p style={{ color: 'var(--text3)', fontSize: '13px', marginTop: '4px' }}>
                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <DashboardStats athletes={athletes} templates={templates} />
            <AthleteList athletes={athletes} onSelect={(a) => console.log(a)} />
          </div>
        )}

        {activePage === 'athletes' && (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: '600' }}>👥 Sportifs</h1>
            <p style={{ color: 'var(--text3)', marginTop: '8px' }}>En construction...</p>
          </div>
        )}

        {activePage === 'library' && (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: '600' }}>📚 Bibliothèque</h1>
            <p style={{ color: 'var(--text3)', marginTop: '8px' }}>En construction...</p>
          </div>
        )}

        {activePage === 'templates' && (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: '600' }}>📋 Templates</h1>
            <p style={{ color: 'var(--text3)', marginTop: '8px' }}>En construction...</p>
          </div>
        )}

        {activePage === 'messages' && (
          <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: '600' }}>💬 Messages</h1>
            <p style={{ color: 'var(--text3)', marginTop: '8px' }}>En construction...</p>
          </div>
        )}

      </main>
    </div>
  )
}