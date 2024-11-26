'use client'

import { useState, ReactNode } from 'react'
import { NavTop } from "@/app/components/nav-top";
import { RetroTemplateBoardColumn } from "@/app/components/retro-template-board-column";
import { HandThumbUpIcon, XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Card } from "@/app/components/card";
import { SurveyPlaceholder } from "@/app/components/survey-placeholder";

interface CardType {
  id: string
  content: string
  reporter: {
    name: string
    avatar: string
    
  }
  commentCount: number
  voteCount: number
}

interface ColumnType {
  id: string
  title: string
  subtitle: string
  icon: ReactNode
  color: string
  cards: CardType[]
}

interface SurveyOption {
  id: string
  text: string
  percentage: number
}

interface Survey {
  title: string
  isPublic: boolean
  options: SurveyOption[]
  totalVotes: number
}

export default function Home() {


  const [teams, setTeams] = useState<string[]>(['CRM', 'DMS']);
  const [selectedTeam, setSelectedTeam] = useState<string>('CRM');
  const [sprints, setSprints] = useState<string[]>(['Sprint 7', 'Sprint 8']);
  const [selectedSprint, setSelectedSprint] = useState<string>('Sprint 7');
  const [columns, setColumns] = useState<Record<string, ColumnType>>({
    'went-well': {
      id: 'went-well',
      title: 'What went well',
      subtitle: 'Share positive outcomes',
      icon: <HandThumbUpIcon className="h-5 w-5" />,
      color: 'color-success',
      cards: [
        { 
          id: '1', 
          content: 'Great teamwork on the project!',
          reporter: {
            name: 'John Doe',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          },
          commentCount: 3,
          voteCount: 5
        },
        { 
          id: '2', 
          content: 'Delivered all features on time',
          reporter: {
            name: 'Jane Smith',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
          },
          commentCount: 1,
          voteCount: 2
        }
      ]
    },
    'stop-doing': {
      id: 'stop-doing',
      title: 'Stop doing',
      subtitle: "What should we change?",
      icon: <XCircleIcon className="h-5 w-5" />,
      color: 'color-danger',
      cards: [
        { 
          id: '3', 
          content: 'Last minute changes to requirements',
          reporter: {
            name: 'Mike Johnson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
          },
          commentCount: 4,
          voteCount: -2
        },
        { 
          id: '4', 
          content: 'Working in silos without communication',
          reporter: {
            name: 'Sarah Wilson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
          },
          commentCount: 2,
          voteCount: 1
        }
      ]
    },
    'continue-doing': {
      id: 'continue-doing',
      title: 'Continue doing',
      subtitle: 'What\'s working well?',
      icon: <ArrowPathIcon className="h-5 w-5" />,
      color: 'color-info',
      cards: [
        { 
          id: '5', 
          content: 'Daily standup meetings',
          reporter: {
            name: 'Alex Brown',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
          },
          commentCount: 0,
          voteCount: 3
        },
        { 
          id: '6', 
          content: 'Code review process',
          reporter: {
            name: 'Emma Davis',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
          },
          commentCount: 1,
          voteCount: 4
        }
      ]
    }
    // ... define other columns similarly
  })

  const surveys: Survey[] = [
    {
      title: 'Sprint Satisfaction',
      isPublic: true,
      options: [
        { id: '2', text: 'Satisfied', percentage: 55 },
        { id: '3', text: 'Neutral', percentage: 35 },
        { id: '4', text: 'Dissatisfied', percentage: 10 },
      ],
      totalVotes: 20
    },
    {
      title: 'Team Communication',
      isPublic: false,
      options: [
        { id: '1', text: 'Excellent', percentage: 35 },
        { id: '3', text: 'Fair', percentage: 60 },
        { id: '4', text: 'Poor', percentage: 5 },
      ],
      totalVotes: 15
    }
  ]

  const handleSurveyActions = {
    onVoteChange: (surveyTitle: string) => console.log('Change vote for:', surveyTitle),
    onEdit: (surveyTitle: string) => console.log('Edit survey:', surveyTitle),
    onReset: (surveyTitle: string) => console.log('Reset survey:', surveyTitle),
    onDelete: (surveyTitle: string) => console.log('Delete survey:', surveyTitle),
  }

  const handleDrop = (cardId: string, sourceColumn: string, targetColumn: string) => {
    setColumns(prev => {
      const newColumns = { ...prev }
      const card = newColumns[sourceColumn].cards.find(c => c.id === cardId)
      
      if (card) {
        newColumns[sourceColumn].cards = newColumns[sourceColumn].cards.filter(c => c.id !== cardId)
        newColumns[targetColumn].cards = [...newColumns[targetColumn].cards, card]
      }
      
      return newColumns
    })
  }

  const handleVote = (cardId: string, columnId: string, direction: 'up' | 'down') => {
    setColumns(prev => {
      return {
        ...prev,
        [columnId]: {
          ...prev[columnId],
          cards: prev[columnId].cards.map(card => 
            card.id === cardId 
              ? { ...card, voteCount: card.voteCount + (direction === 'up' ? 1 : -1) }
              : card
          )
        }
      };
    });
  }

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
        <div className="flex gap-4 flex-[3]">
          {Object.values(columns).map(column => (
            <RetroTemplateBoardColumn
              key={column.id}
              columnId={column.id}
              title={column.title}
              subtitle={column.subtitle}
              icon={column.icon}
              color={column.color}
              onDrop={handleDrop}
            >
              {column.cards.map(card => (
                <Card 
                  key={card.id}
                  id={card.id}
                  columnId={column.id}
                  color={column.color}
                  reporter={card.reporter}
                  commentCount={card.commentCount}
                  voteCount={card.voteCount}
                  onVote={(direction) => handleVote(card.id, column.id, direction)}
                >
                  {card.content}
                </Card>
              ))}
            </RetroTemplateBoardColumn>
          ))}
        </div>
        <div className="flex-1">
          <SurveyPlaceholder 
            surveys={surveys}
            onSurveyActions={handleSurveyActions}
          />
        </div>
      </div>
    </div>
  )
}

