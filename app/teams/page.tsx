'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { InviteMemberModal } from './components/InviteMemberModal';
import { CreateTeamModal } from './components/CreateTeamModal';
import { Team } from '@/app/@types/teams';


export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Teams</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Team
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">{team.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{team.description}</p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this team?')) {
                    // Handle delete
                  }
                }}
                className="text-red-600 hover:text-red-700 dark:text-red-400"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Members List */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium dark:text-gray-200">Members ({team.members.length})</h4>
                <button
                  onClick={() => {
                    setSelectedTeam(team);
                    setShowInviteModal(true);
                  }}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <UserPlusIcon className="w-4 h-4 mr-1" />
                  Invite
                </button>
              </div>
              <div className="space-y-1">
                {team.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="dark:text-gray-300">{member.name}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Team Modal */}
      {showCreateModal && (
        <CreateTeamModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(newTeam) => {
            setTeams([...teams, newTeam]);
            setShowCreateModal(false);
          }}
        />
      )}

      {/* Invite Member Modal */}
      {showInviteModal && selectedTeam && (
        <InviteMemberModal
          team={selectedTeam}
          onClose={() => {
            setShowInviteModal(false);
            setSelectedTeam(null);
          }}
          onInvite={(email) => {
            // Handle invitation logic
            setShowInviteModal(false);
            setSelectedTeam(null);
          }}
        />
      )}
    </div>
  );
}