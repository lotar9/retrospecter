"use client"

import { ReactNode, useState } from "react";
import { NavTop } from "./nav-top";
import { Team } from "../types/teams";
import { Sprint } from "../types/sprints";

export default function Skeleton({ children }: { children: ReactNode }) {
    const [selectedTeam, setSelectedTeam] = useState<Team>();
    const [selectedSprint, setSelectedSprint] = useState<Sprint>(); 

    return (
        <div className="flex h-screen flex-col bg-white dark:bg-gray-900">
            <NavTop 
            selectedTeam={selectedTeam} 
            onTeamChange={setSelectedTeam} 
            selectedSprint={selectedSprint} 
            onSprintChange={setSelectedSprint}    
            />
            <div className="flex flex-1 gap-4 p-4">
                {children}
            </div>
    
        </div>
    )
}