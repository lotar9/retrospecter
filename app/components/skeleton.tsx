"use client"

import { ReactNode, useState } from "react";
import { NavTop } from "./nav-top";

export default function Skeleton({ children }: { children: ReactNode }) {
    const [teams, setTeams] = useState<string[]>(['CRM', 'DMS']);
    const [selectedTeam, setSelectedTeam] = useState<string>('CRM');
    const [sprints, setSprints] = useState<string[]>(['Sprint 7', 'Sprint 8']);
    const [selectedSprint, setSelectedSprint] = useState<string>('Sprint 7');

    return (
        <div className="flex h-screen flex-col bg-white dark:bg-gray-900">
            <NavTop 
            teams={teams} 
            selectedTeam={selectedTeam} 
            onTeamChange={setSelectedTeam} 
            sprints={sprints} 
            selectedSprint={selectedSprint} 
            onSprintChange={setSelectedSprint} 
            />
            <div className="flex flex-1 gap-4 p-4">
                {children}
            </div>
        </div>
    )
}