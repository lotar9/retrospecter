import { ReactNode } from "react"
import { User } from "./user"

export interface Vote {
    voteId: string
    createdAt: number
    createdBy: string
    cardId: string
    user?: User
}

export interface Comment {
    commentId: string
    description: string
    createdAt: number
    createdBy: string
    cardId: string
    user?: User
}

export interface Card {
    cardId: string
    description: string
    createdAt: number
    createdBy: string
    teamId: string
    sprintId: string
    columnId: string
    user?: User
    votes: Vote[]
    comments: Comment[]
}

export interface Column {
    columnId: string
    description: string
    name: string
    color: string
    icon: string
    heroIcon?: ReactNode
    cards: Card[]
}