import { Team } from "../types/teams"

export const fetchTeams = async () => {
  const response = await fetch('/api/teams')
  return response.json()
}

export const fetchSprints = async (teamId: string) => {
  const response = await fetch(`/api/teams/${teamId}/sprints`)
  return response.json()
}

export const getTeam = async (teamId: string) => {
  const response = await fetch(`/api/teams/${teamId}`)
  return response.json()
}

export const saveTeam = async (team: Team) => {
  const response = await fetch('/api/teams', {
    method: 'POST',
    body: JSON.stringify(team)
  })
}

export const deleteTeam = async (teamId: string) => {
  const response = await fetch(`/api/teams/${teamId}`, {
    method: 'DELETE'
  })
}

export const inviteMember = async (teamId: string, email: string) => {
  const response = await fetch(`/api/teams/${teamId}/invite`, {
    method: 'POST',
    body: JSON.stringify({ email })
  })
}

export const removeMember = async (teamId: string, userId: string) => {
  const response = await fetch(`/api/teams/${teamId}/remove`, {
    method: 'DELETE',
    body: JSON.stringify({ userId })
  })
}