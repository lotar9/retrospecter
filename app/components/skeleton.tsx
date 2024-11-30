"use client"

import { ReactNode, useState } from "react";
import { NavTop } from "./nav-top";

export default function Skeleton({ children }: { children: ReactNode }) {
    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [selectedSprint, setSelectedSprint] = useState<string>('');

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