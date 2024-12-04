
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/app/lib/db";
import { getJiraSprints } from "@/app/lib/jira";
import { Team } from "@/app/types/teams";


export async function GET(
  request: Request,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    const params = await context.params;
    const teamResponse = await client.query({
    TableName: "AgileTeams",
    KeyConditionExpression: "PK = :pk AND SK = :sk",
    ExpressionAttributeValues: {
        ":pk": `TEAM#${params.teamId}`,
        ":sk": `METADATA#${params.teamId}`
    }
    });

    if (!teamResponse.Items || teamResponse.Items.length === 0) {
        return NextResponse.json([]);
    }
    const team = teamResponse.Items[0] as Team;
    const jiraSprints = await getJiraSprints(team);
    if (jiraSprints.length > 0) {
        const startDate = new Date('2024-11-01T12:00:00Z');
        jiraSprints.forEach(sprint => {
            if (new Date(sprint.endDate) >= startDate) {
            const sprintRecord = {
                PK: `TEAM#${params.teamId}`,
                SK: `SPRINT#${sprint.id}`,
                type: "SPRINT",
                name: sprint.name,
                startDate: sprint.startDate,
                endDate: sprint.endDate,
                state: sprint.state,
                goal: sprint.goal || "",
                completedDate: sprint.completeDate || null
            };

            await client.put({
                TableName: "AgileTeams",
                Item: sprintRecord
            });
            }
        });

    return NextResponse.json(
        getJiraSprints(team)
    );
} catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
}



}

export async function POST(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const sprintId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    await client.put({
      TableName: "RetroApp",
      Item: {
        PK: `TEAM#${params.teamId}`,
        SK: `SPRINT#${sprintId}`,
        GSI2PK: `TEAM#${params.teamId}`,
        GSI2SK: "STATUS#active",
        type: "SPRINT",
        name: body.name,
        startDate: body.startDate,
        endDate: body.endDate,
        status: "active",
        createdAt: timestamp,
        createdBy: session.user.id
      }
    });

    return NextResponse.json({ sprintId });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 