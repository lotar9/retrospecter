"use client"
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Team } from '@/app/@types/teams';
import { Sprint } from '@/app/@types/sprints';
interface SecondaryNavTopProps {
  selectedTeam: string;
  onTeamChange: (team: string) => void;
  selectedSprint: string;
  onSprintChange: (sprint: string) => void;
}

export default function SecondaryNavTop({ 
  selectedTeam, 
  onTeamChange, 
  selectedSprint, 
  onSprintChange 
}: SecondaryNavTopProps) {
  const [teams, setTeams] = useState<Team[]>([
    { id: 'CRM', name: 'CRM', description: 'CRM', externalBoardId: 1, members: [] },
    { id: 'DMS  ', name: 'DMS' , description: 'DMS', externalBoardId: 2, members: [] }
  ]);
  const [sprints, setSprints] = useState<Sprint[]>([
    { id: 'Sprint 7', name: 'Sprint 7' , teamId: 1, externalId: 1, startDate: '', endDate: '', completedDate: '', status: '', goal: ''},
    { id: 'Sprint 8', name: 'Sprint 8' , teamId: 2, externalId: 2, startDate: '', endDate: '', completedDate: '', status: '', goal: ''}
  ]);
  const pathname = usePathname();

  // Don't render anything if we're on the teams route
  if (pathname === '/teams') return null;



  return (
    <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 flex items-center justify-end space-x-4">
          {/* Team Select */}
          <select
            value={selectedTeam}
            onChange={(e) => onTeamChange(e.target.value)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>

          {/* Sprint Select */}
          <select
            value={selectedSprint}
            onChange={(e) => onSprintChange(e.target.value)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {sprints.map(sprint => (
              <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
            ))}
          </select>

          {/* Connected Users Section */}
          <div className="flex -space-x-2 overflow-hidden">
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
            />
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-800">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">+3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
