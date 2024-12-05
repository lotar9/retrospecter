"use client"
import { useState , useEffect} from 'react';
import { usePathname } from 'next/navigation';
import { Team } from '@/app/types/teams';
import { Sprint } from '@/app/types/sprints';
import { fetchTeams, fetchSprints } from '@/app/lib/data';

interface SecondaryNavTopProps {
  selectedTeam: Team | undefined;
  onTeamChange: (team: Team | undefined) => void;
  selectedSprint: Sprint | undefined;
  onSprintChange: (sprint: Sprint | undefined) => void;
}

export default function SecondaryNavTop({ 
  selectedTeam, 
  onTeamChange, 
  selectedSprint, 
  onSprintChange 
}: SecondaryNavTopProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  useEffect(() => {
    const loadTeams = async () => {
      const teamsData = await fetchTeams();
      setTeams(teamsData);
      // Only update selected team if we don't have one and there are teams available
      if (teamsData.length > 0 && !selectedTeam) {
        onTeamChange(teamsData[0]);
      }
    };
    loadTeams();
  }, []);
  useEffect(() =>{
    const loadSprints = async (teamId:string) => {
      const sprintData = await fetchSprints(teamId);
      setSprints(sprintData);
      if (sprintData.length > 0 && !selectedSprint){
        onSprintChange(sprintData[0]);
      }
    }
    if (selectedTeam){
      loadSprints(selectedTeam.teamId)  
    }
  },[selectedTeam])


  const pathname = usePathname();

  // Don't render anything if we're on the teams route
  if (pathname === '/teams') return null;

  return (
    <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 flex items-center justify-end space-x-4">
          {/* Team Select */}
          <select
            value={selectedTeam?.teamId }
            onChange={(e) => onTeamChange(teams.find(team => team.teamId === e.target.value))}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {teams.map(team => (
              <option key={team.teamId} value={team.teamId}>{team.name}</option>
            ))}
          </select>

          {/* Sprint Select */}
          <select
            value={selectedSprint?.sprintId}
            onChange={(e) => onSprintChange(sprints.find(sprint => sprint.sprintId === e.target.value))}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {sprints.map(sprint => (
              <option key={sprint.sprintId} value={sprint.sprintId}>{sprint.name}</option>
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
