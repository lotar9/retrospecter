import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/app/lib/db";
import { Team } from "@/app/types/teams";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Get all teams where the user is a member
    const userTeams = await client.query({
      TableName: "AgileTeams",
      IndexName: "GSI1",
      KeyConditionExpression: "GSI1PK = :pk AND begins_with(GSI1SK, :sk)",
      ExpressionAttributeValues: {
        ":pk": `USER#${session.user.id}`,
        ":sk": "TEAM#"
      }
    });

    if (!userTeams.Items || userTeams.Items.length === 0) {
      return NextResponse.json([]);
    }

    // Get the full team details for each team
    const teamPromises = userTeams.Items?.map(async (userTeam) => {
      const teamId = userTeam.teamId;
      const teamResult = await client.query({
        TableName: "AgileTeams",
        KeyConditionExpression: "PK = :pk AND SK = :sk",
        ExpressionAttributeValues: {
          ":pk": `TEAM#${teamId}`,
          ":sk": `METADATA#${teamId}`
        }
      });

      const memberResults = await client.query({
        TableName: "AgileTeams",
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": `TEAM#${teamId}`,
          ":sk": "MEMBER#"
        }
      });

      const teamData = teamResult.Items?.[0];
      const members = memberResults.Items?.map(member => ({
        id: member.userId,
        name: member.name || '',
        email: member.email || '',
        role: member.role
      })) || [];

      return {
        id: teamId,
        name: teamData?.name || '',
        description: teamData?.description || '',
        externalBoardId: teamData?.externalBoardId || '',
        members
      };
    }) || [];

    const teams = await Promise.all(teamPromises);
    return NextResponse.json(teams);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body:Team = await request.json();
    const teamId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    await client.transactWrite({
      TransactItems: [
        {
          Put: {
            TableName: "AgileTeams",
            Item: {
              PK: `TEAM#${teamId}`,
              SK: `METADATA#${teamId}`,
              entityType: "team",
              teamId: teamId,
              name: body.name,
              description: body.description,
              externalBoardId: body.externalBoardId,
              createdAt: timestamp,
              createdBy: session.user.id
            }
          }
        },
        {
          Put: {
            TableName: "AgileTeams",
            Item: {
              PK: `TEAM#${teamId}`,
              SK: `MEMBER#${session.user.id}`,
              GSI1PK: `USER#${session.user.id}`,
              GSI1SK: `TEAM#${teamId}`,
              entityType: 'member',
              teamId: teamId,
              userId: session.user.id,
              role: 'admin',
              joinedAt: timestamp,
              invitedBy: session.user.id
            }
          }
        }
      ]
    });

    return NextResponse.json({ teamId });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 