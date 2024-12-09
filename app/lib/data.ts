import { Card, Column } from "../types/cards"
import { Team } from "../types/teams"
import { auth } from "@/auth"

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

export const fetchCards = async (teamId: string, sprintId: string) => {
  const response = await fetch(`/api/teams/${teamId}/sprints/${sprintId}/cards`);
  const cards = await response.json();
  const returned: Record<string, Column> = {};
  getColumns().forEach(column => {
    returned[column.columnId] = column;
  });
  return returned;
}

const getColumns = ():Column[] => {
  return [
    {columnId:'what-went-well',description:'What went well',name:'Share positive outcomes',color:'color-success',icon:'HandThumbUpIcon',cards:[]},
    {columnId:'stop-doing',description:'Stop doing',name:'What should we change?',color:'color-danger',icon:'XCircleIcon',cards:[]},
    {columnId:'continue-doing',description:'Continue doing',name:'What\'s working well',color:'color-info',icon:'ArrowPathIcon',cards:[]},
  ];
}

export const addCard = async (teamId: string, sprintId: string, columnId: string, content: string) => {
  const body = {columnId, content};
  const response = await fetch(`/api/teams/${teamId}/sprints/${sprintId}/cards`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const card:Card = await response.json();
  card.teamId = teamId;
  card.columnId = columnId;
  card.sprintId = sprintId;
  card.votes = []
  card.comments =[]

  return card;
}