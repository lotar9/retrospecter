import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

// Configure DynamoDB Local
const dynamodb = new DynamoDBClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
});

// Sample users with their IDs
const users = {
    user1: { id: 'sergio@nextlane.com', name: 'Sergio Nextlane' },
    user2: { id: 'sergio.canales@gmail.com', name: 'Sergio Gmail' },
    user3: { id: 'user3', name: 'Bob Wilson' },
    user4: { id: 'user4', name: 'Alice Brown' },
    user5: { id: 'user5', name: 'Charlie Davis' },
    user6: { id: 'user6', name: 'Eve Johnson' },
    user7: { id: 'user7', name: 'Frank Miller' }, // Shared member
};

// Generate sample data
const sampleData = [
    // Team 1
    {
        PK: 'TEAM#team1',
        SK: 'METADATA#team1',
        entityType: 'team',
        teamId: 'team1',
        name: 'Frontend Team',
        description: 'Web application development team',
        createdAt: '2024-01-01T00:00:00Z',
        createdBy: users.user1.id
    },
    // Team 1 Members
    {
        PK: 'TEAM#team1',
        SK: `MEMBER#${users.user1.id}`,
        GSI1PK: `USER#${users.user1.id}`,
        GSI1SK: 'TEAM#team1',
        entityType: 'member',
        teamId: 'team1',
        userId: users.user1.id,
        role: 'admin',
        joinedAt: '2024-01-01T00:00:00Z',
        invitedBy: users.user1.id
    },
    {
        PK: 'TEAM#team1',
        SK: `MEMBER#${users.user2.id}`,
        GSI1PK: `USER#${users.user2.id}`,
        GSI1SK: 'TEAM#team1',
        entityType: 'member',
        teamId: 'team1',
        userId: users.user2.id,
        role: 'member',
        joinedAt: '2024-01-01T00:00:00Z',
        invitedBy: users.user1.id
    },
    {
        PK: 'TEAM#team1',
        SK: `MEMBER#${users.user3.id}`,
        GSI1PK: `USER#${users.user3.id}`,
        GSI1SK: 'TEAM#team1',
        entityType: 'member',
        teamId: 'team1',
        userId: users.user3.id,
        role: 'member',
        joinedAt: '2024-01-01T00:00:00Z',
        invitedBy: users.user1.id
    },
    {
        PK: 'TEAM#team1',
        SK: `MEMBER#${users.user7.id}`,
        GSI1PK: `USER#${users.user7.id}`,
        GSI1SK: 'TEAM#team1',
        entityType: 'member',
        teamId: 'team1',
        userId: users.user7.id,
        role: 'member',
        joinedAt: '2024-01-01T00:00:00Z',
        invitedBy: users.user1.id
    },

    // Team 2
    {
        PK: 'TEAM#team2',
        SK: 'METADATA#team2',
        entityType: 'team',
        teamId: 'team2',
        name: 'Backend Team',
        description: 'API and infrastructure team',
        createdAt: '2024-01-01T00:00:00Z',
        createdBy: users.user4.id
    },
    // Team 2 Members
    {
        PK: 'TEAM#team2',
        SK: `MEMBER#${users.user4.id}`,
        GSI1PK: `USER#${users.user4.id}`,
        GSI1SK: 'TEAM#team2',
        entityType: 'member',
        teamId: 'team2',
        userId: users.user4.id,
        role: 'admin',
        joinedAt: '2024-01-01T00:00:00Z',
        invitedBy: users.user4.id
    },
    {
        PK: 'TEAM#team2',
        SK: `MEMBER#${users.user5.id}`,
        GSI1PK: `USER#${users.user5.id}`,
        GSI1SK: 'TEAM#team2',
        entityType: 'member',
        teamId: 'team2',
        userId: users.user5.id,
        role: 'member',
        joinedAt: '2024-01-01T00:00:00Z',
        invitedBy: users.user4.id
    },
    {
        PK: 'TEAM#team2',
        SK: `MEMBER#${users.user6.id}`,
        GSI1PK: `USER#${users.user6.id}`,
        GSI1SK: 'TEAM#team2',
        entityType: 'member',
        teamId: 'team2',
        userId: users.user6.id,
        role: 'member',
        joinedAt: '2024-01-01T00:00:00Z',
        invitedBy: users.user4.id
    },
    {
        PK: 'TEAM#team2',
        SK: `MEMBER#${users.user7.id}`,
        GSI1PK: `USER#${users.user7.id}`,
        GSI1SK: 'TEAM#team2',
        entityType: 'member',
        teamId: 'team2',
        userId: users.user7.id,
        role: 'member',
        joinedAt: '2024-01-01T00:00:00Z',
        invitedBy: users.user4.id
    }
];

// Generate Sprints for both teams
['team1', 'team2'].forEach(teamId => {
    for (let i = 1; i <= 2; i++) {
        const sprintId = `${teamId}-sprint${i}`;
        sampleData.push({
            PK: `TEAM#${teamId}`,
            SK: `SPRINT#${sprintId}`,
            GSI1PK: `SPRINT#${sprintId}`,
            GSI1SK: `TEAM#${teamId}`,
            entityType: 'sprint',
            sprintId: sprintId,
            teamId: teamId,
            name: `Sprint ${i}`,
            startDate: `2024-0${i}-01T00:00:00Z`,
            endDate: `2024-0${i}-14T00:00:00Z`,
            status: 'active',
            createdBy: teamId === 'team1' ? users.user1.id : users.user4.id
        });

        // Generate Cards for each sprint
        ['column1', 'column2', 'column3'].forEach((column, colIndex) => {
            // 2-3 cards per column
            for (let j = 1; j <= 2 + Math.floor(Math.random() * 2); j++) {
                const cardId = `${sprintId}-card${colIndex}${j}`;
                const teamUsers = teamId === 'team1' 
                    ? [users.user1, users.user2, users.user3, users.user7]
                    : [users.user4, users.user5, users.user6, users.user7];
                
                sampleData.push({
                    PK: `SPRINT#${sprintId}`,
                    SK: `CARD#${cardId}`,
                    GSI1PK: `COLUMN#${column}`,
                    GSI1SK: `SPRINT#${sprintId}#CARD#${cardId}`,
                    entityType: 'card',
                    cardId: cardId,
                    sprintId: sprintId,
                    columnId: column,
                    title: `Task ${j} in ${column}`,
                    description: `Description for task ${j} in ${column}`,
                    reporter: teamUsers[Math.floor(Math.random() * teamUsers.length)].id,
                    createdAt: `2024-0${i}-0${j}T00:00:00Z`,
                    votes: teamUsers
                        .filter(() => Math.random() > 0.5)
                        .map(user => ({
                            userId: user.id,
                            votedAt: `2024-0${i}-0${j}T00:00:00Z`,
                            voteType: Math.random() > 0.3 ? 'up' : 'down'
                        })),
                    comments: teamUsers
                        .filter(() => Math.random() > 0.6)
                        .map(user => ({
                            commentId: uuidv4(),
                            userId: user.id,
                            content: `Comment from ${user.name}`,
                            createdAt: `2024-0${i}-0${j}T00:00:00Z`
                        }))
                });

                // Generate 1-2 actions per card
                for (let k = 1; k <= 1 + Math.floor(Math.random() * 2); k++) {
                    const actionId = `${cardId}-action${k}`;
                    sampleData.push({
                        PK: `CARD#${cardId}`,
                        SK: `ACTION#${actionId}`,
                        GSI1PK: `SPRINT#${sprintId}`,
                        GSI1SK: `ACTION#${actionId}`,
                        entityType: 'action',
                        actionId: actionId,
                        cardId: cardId,
                        sprintId: sprintId,
                        title: `Action ${k} for ${cardId}`,
                        description: `Description for action ${k}`,
                        assignee: teamUsers[Math.floor(Math.random() * teamUsers.length)].id,
                        status: ['pending', 'in_progress', 'completed'][Math.floor(Math.random() * 3)],
                        createdAt: `2024-0${i}-0${j}T00:00:00Z`,
                        dueDate: `2024-0${i}-${j + 7}T00:00:00Z`
                    });
                }
            }
        });
    }
});

// Function to batch write items to DynamoDB
async function batchWriteItems(items: any[]) {
    const tableName = 'AgileTeams';
    for (let i = 0; i < items.length; i += 25) {
        const batch = items.slice(i, i + 25);
        const params = {
            RequestItems: {
                [tableName]: batch.map(item => ({
                    PutRequest: {
                        Item: item
                    }
                }))
            }
        };
        try {
            await dynamodb.batchWrite(params).promise();
            console.log(`Batch ${i/25 + 1} written successfully`);
        } catch (error) {
            console.error('Error writing batch:', error);
            throw error;
        }
    }
}

// Main function to load data
async function loadSampleData() {
    try {
        await batchWriteItems(sampleData);
        console.log('Sample data loaded successfully');
    } catch (error) {
        console.error('Error loading sample data:', error);
    }
}

// Run the loader
loadSampleData();