'use client'

import { useState, useEffect } from 'react'
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
import { getAthletes, createAthlete, updateAthlete, deleteAthlete } from '@/lib/athletes'
import { templates as initialTemplates } from '@/data/templates'

export default function Home() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedAthlete, setSelectedAthlete] = useState(null)
  const [athletes, setAthletes] = useState([])
  const [loading, setLoading] = useState(true)
  const [templates, setTemplates] = useState(initialTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showNewAthlete, setShowNewAthlete] = useState(false)
  const [newAthleteName, setNewAthleteName] = useState('')

  // Load athletes from Supabase
  useEffect(() => {
    loadAthletes()
  }, [])

  const loadAthletes = async () => {
    try {
      const data = await getAthletes()
      setAthletes(data)
    } catch (err) {
      console.error('Error loading athletes:', err)
    } finally {
      setLoading(false)
    }
  }

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

  const handleCreateAthlete = async () => {
    if (!newAthleteName.trim()) return
    try {
      const newAth = await createAthlete({ name: newAthleteName.trim() })
      setAthletes(prev => [...prev, newAth])
      setShowNewAthlete(false)
      setNewAthleteName('')
      setSelectedAthlete(newAth)
      setActivePage('athlete-profile')
    } catch (err) {
      console.error('Error creating athlete:', err)
    }
  }

  const handleSaveAthlete = async (updates) => {
    try {
      const updated = await updateAthlete(selectedAthlete.id, updates)
      setAthletes(prev => prev.map(a => a.id === updated.id ? updated : a))
      setSelectedAthlete(updated)
    } catch (err) {
      console.error('Error saving athlete:', err)
    }
  }

  const handleDeleteAthlete = async (id) => {
    try {
      await deleteAthlete(id)
      setAthletes(prev => prev.filter(a => a.id !== id))
      setActivePage('athletes')
    } catch (err) {
      console.error('Error deleting athlete:', err)
    }
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

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text3)' }}>
        Chargement...
      </div>
    )
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
          <>
            <AthletesList
              athletes={athletes}
              onSelect={handleSelectAthlete}
              onNew={() => setShowNewAthlete(true)}
            />
            {showNewAthlete && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--rl)', padding: '24px', width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600' }}>Nouveau sportif</h3>
                  <input
                    type="text"
                    placeholder="Prénom Nom"
                    value={newAthleteName}
                    onChange={e => setNewAthleteName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCreateAthlete()}
                    autoFocus
                    style={{ padding: '8px 12px', border: '1px solid var(--border2)', borderRadius: 'var(--r)', fontSize: '14px', outline: 'none' }}
                  />
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => { setShowNewAthlete(false); setNewAthleteName('') }} style={{ padding: '7px 16px', border: '1px solid var(--border2)', borderRadius: '20px', background: 'none', cursor: 'pointer' }}>Annuler</button>
                    <button onClick={handleCreateAthlete} style={{ padding: '7px 16px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: '500' }}>Créer</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activePage === 'athlete-profile' && selectedAthlete && (
          <AthleteProfile
            athlete={selectedAthlete}
            onBack={handleBack}
            onCalendar={() => openCalendar(selectedAthlete)}
            onSave={handleSaveAthlete}
            onDelete={() => handleDeleteAthlete(selectedAthlete.id)}
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