'use client'

import { ChartBarIcon } from '@heroicons/react/24/outline'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Survey } from '@/app/components/survey'

interface SurveyOption {
  id: string
  text: string
  percentage: number
}

interface SurveyData {
  title: string
  isPublic: boolean
  options: SurveyOption[]
  totalVotes: number
}

interface SurveyActions {
  onVoteChange: (surveyTitle: string) => void
  onEdit: (surveyTitle: string) => void
  onReset: (surveyTitle: string) => void
  onDelete: (surveyTitle: string) => void
}

interface SurveyPlaceholderProps {
  surveys: SurveyData[]
  onSurveyActions: SurveyActions
}

export function SurveyPlaceholder({ surveys, onSurveyActions }: SurveyPlaceholderProps) {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.32))] w-full flex-col rounded-lg border border-t-4 border-t-orange-500 bg-gray-50 dark:bg-gray-800 p-4 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">
            <ChartBarIcon className="h-5 w-5" />
          </span>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Surveys</h3>
        </div>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 py-4">
          {surveys.map((survey) => (
            <Survey
              key={survey.title}
              title={survey.title}
              isPublic={survey.isPublic}
              options={survey.options}
              totalVotes={survey.totalVotes}
              onVoteChange={() => onSurveyActions.onVoteChange(survey.title)}
              onEdit={() => onSurveyActions.onEdit(survey.title)}
              onReset={() => onSurveyActions.onReset(survey.title)}
              onDelete={() => onSurveyActions.onDelete(survey.title)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
