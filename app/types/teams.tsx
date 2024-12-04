export interface Team {
    teamId: string;
    name: string;
    description: string;
    externalBoardId: number;
    createdAt: string;
    createdBy: string;
    members: TeamMember[];
}
  
export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'member';
}

export interface InviteMemberModalProps {
    team: Team;
    onClose: () => void;
    onInvite: (email: string) => void;
}

export interface CreateTeamModalProps {
    onClose: () => void;
    onCreate: (team: Team) => void;
}