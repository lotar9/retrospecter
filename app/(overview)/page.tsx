'use client'

import { useState, ReactNode, useEffect } from 'react'
import { RetroTemplateBoardColumn } from "@/app/components/retro-template-board-column";
import { HandThumbUpIcon, XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Card } from "@/app/components/card";
import { SurveyPlaceholder } from "@/app/components/survey-placeholder";
import SecondaryNavTop from '../components/secondary-nav-top';
import { Team } from '../types/teams';
import { Sprint } from '../types/sprints';
import { addCard, fetchCards } from '../lib/data';
import { Column } from '../types/cards';

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

  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [selectedSprint, setSelectedSprint] = useState<Sprint>(); 
  const [columns, setColumns] = useState<Record<string, Column>>({});

  useEffect( () =>{
    const loadCards = async () =>{
      if (selectedTeam && selectedSprint){
        const columns:Record<string,Column> = await fetchCards(selectedTeam.teamId, selectedSprint.sprintId);
        const iconMapping: Record<string, ReactNode> = {
          'HandThumbUpIcon': <HandThumbUpIcon className="h-5 w-5" />,
          'XCircleIcon': <XCircleIcon className="h-5 w-5" />,
          'ArrowPathIcon': <ArrowPathIcon className="h-5 w-5" />,
        };
        Object.values(columns).forEach(column => {
          column.heroIcon = iconMapping[column.icon] || column.icon;
        });
        setColumns(columns)
      }
    }
    loadCards();

  },[selectedTeam,selectedSprint]);

  /*
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
  */

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

  const handleAddCard = async (column: Column, content: string) => {
    if (selectedTeam && selectedSprint) {
      const card = await addCard(selectedTeam.teamId, selectedSprint.sprintId, column.columnId, content);
      setColumns(prev => {
        const newColumns = { ...prev };
        if (card) {
          newColumns[column.columnId].cards = [...newColumns[column.columnId].cards, card];
        }
        return newColumns;
      });
    }
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
    <>
      <div className="flex items-center justify-between px-4">
        <SecondaryNavTop 
          selectedTeam={selectedTeam} 
          onTeamChange={setSelectedTeam} 
          selectedSprint={selectedSprint} 
          onSprintChange={setSelectedSprint} 
        />
      </div>
      <div className="flex flex-1 gap-4 p-4">

        <div className="flex gap-4 flex-[3]">
          {Object.values(columns).map(column => (
            <RetroTemplateBoardColumn
              key={column.columnId}
              column={column}
              onDrop={handleDrop}
              onAdd={handleAddCard}
            >
              {column.cards.map(card => (
                <Card 
                  key={card.cardId}
                  id={card.cardId}
                  columnId={column.columnId}
                  color={column.color}
                  reporter={card.user ? { name: card.user.name, avatar: card.user.image } : { name: '', avatar: '' }}
                  commentCount={card.comments.length}
                  voteCount={card.votes.length}
                  onVote={(direction) => handleVote(card.cardId, column.columnId, direction)}>
                  {card.description}
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
    </>
  )
}

