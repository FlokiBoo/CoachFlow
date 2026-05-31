import { supabase } from './supabase'

export async function getAthletes() {
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function createAthlete(athlete) {
  const { data, error } = await supabase
    .from('athletes')
    .insert([{
      name: athlete.name,
      email: athlete.email || '',
      phone: athlete.phone || '',
      age: athlete.age || null,
      height: athlete.height || null,
      weight: athlete.weight || null,
      objectives: athlete.objectives || [],
      secondary_objectives: athlete.secondaryObjectives || [],
      limitations: athlete.limitations || [],
    }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateAthlete(id, updates) {
  const { data, error } = await supabase
    .from('athletes')
    .update({
      name: updates.name,
      email: updates.email || '',
      phone: updates.phone || '',
      age: updates.age || null,
      height: updates.height || null,
      weight: updates.weight || null,
      objectives: updates.objectives || [],
      secondary_objectives: updates.secondaryObjectives || [],
      limitations: updates.limitations || [],
    })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteAthlete(id) {
  const { error } = await supabase
    .from('athletes')
    .delete()
    .eq('id', id)
  if (error) throw error
}