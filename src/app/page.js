'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import DashboardStats from '@/components/dashboard/DashboardStats'
import AthleteList from '@/components/dashboard/AthleteList'
import AthletesList from '@/components/athletes/AthletesList'
import AthleteProfile from '@/components/athletes/AthleteProfile'
import Calendar from '@/components/calendar/Calendar'
import ExerciseLibrary from '@/components/library/ExerciseLibrary'
import TemplatesList from '@/components/templates/TemplatesList'
import TemplateEditor from '@/components/templates/TemplateEditor'
import MetricsPage from '@/components/metrics/MetricsPage'
import { athletes } from '@/data/athletes'
import { templates as initialTemplates } from '@/data/templates'

export default function Home() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedAthlete, setSelectedAthlete] = useState(null)
  const [templates, setTemplates] = useState(initialTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const handleSelectAthlete = (athlete) => {
    setSelectedAthlete(athlete)
    setActivePage('athlete-profile')
  }

  const handleBack = () => {
    setSelectedAthlete(null)
    setActivePage('athletes')
  }

  const openCalendar = (athlete) => {
    setSelectedAthlete(athlete)
    setActivePage('calendar')
  }

  const createTemplate = () => {
    const newTemplate = { id: Date.now(), name: 'Nouveau template', weeks: 1 }
    setSelectedTemplate(newTemplate)
    setActivePage('template-editor')
  }

  const saveTemplate = (data) => {
    setTemplates(prev => {
      const exists = prev.find(t => t.id === selectedTemplate.id)
      if (exists) return prev.map(t => t.id === selectedTemplate.id ? { ...t, ...data } : t)
      return [...prev, { ...selectedTemplate, ...data }]
    })
    setActivePage('templates')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main style={{ flex: 1, overflow: 'hidden', background: 'var(--bg2)' }}>

        {activePage === 'dashboard' && (
          <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '600' }}>📊 Dashboard</h1>
              <p style={{ color: 'var(--text3)', fontSize: '13px', marginTop: '4px' }}>
                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <DashboardStats athletes={athletes} templates={templates} />
            <AthleteList athletes={athletes} onSelect={handleSelectAthlete} />
          </div>
        )}

        {activePage === 'athletes' && (
          <AthletesList athletes={athletes} onSelect={handleSelectAthlete} />
        )}

        {activePage === 'athlete-profile' && selectedAthlete && (
          <AthleteProfile
            athlete={selectedAthlete}
            onBack={handleBack}
            onCalendar={() => openCalendar(selectedAthlete)}
          />
        )}

        {activePage === 'calendar' && selectedAthlete && (
          <Calendar
            athlete={selectedAthlete}
            onBack={() => setActivePage('athlete-profile')}
          />
        )}

        {activePage === 'library' && <ExerciseLibrary />}

        {activePage === 'templates' && (
          <TemplatesList
            templates={templates}
            onSelect={(t) => { setSelectedTemplate(t); setActivePage('template-editor') }}
            onCreate={createTemplate}
          />
        )}

        {activePage === 'template-editor' && (
          <TemplateEditor
            template={selectedTemplate}
            onBack={() => setActivePage('templates')}
            onSave={saveTemplate}
          />
        )}

        {activePage === 'metrics' && <MetricsPage athletes={athletes} />}

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