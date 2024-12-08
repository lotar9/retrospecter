"use client"
import { useState , useEffect} from 'react';
import { usePathname } from 'next/navigation';
import { Team } from '@/app/types/teams';
import { Sprint } from '@/app/types/sprints';
import { fetchTeams, fetchSprints } from '@/app/lib/data';
import { ConnectedUsers } from './connected-users';

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
    <div className="w-full">
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
          <ConnectedUsers/>
        </div>
      </div>
    </div>
  )
}
