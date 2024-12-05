import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/app/lib/db";
import { getJiraSprints } from "@/app/lib/jira";
import { Team } from "@/app/types/teams";
import { Sprint } from "@/app/types/sprints";


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
    const retroSprints: Sprint[] = [];
    if (jiraSprints.total > 0) {
        const startDate = new Date('2024-11-01T12:00:00Z');
        jiraSprints.values.forEach( (sprint: any) => {
            if (new Date(sprint.endDate) >= startDate) {
              const sprintWithoutKeys = {
                  sprintId: sprint.id,
                  name: sprint.name,
                  startDate: sprint.startDate,
                  endDate: sprint.endDate,
                  state: sprint.state,
                  goal: sprint.goal || "",
                  completedDate: sprint.completeDate || null
              } as Sprint;
              retroSprints.push(sprintWithoutKeys);
              const sprintRecord = {
                PK: `TEAM#${params.teamId}`,
                SK: `SPRINT#${sprint.id}`,
                GSI1PK: `TEAM#${params.teamId}`,
                entityType: 'sprint',
                ...sprintWithoutKeys
              } ;
              client.put({
                  TableName: "AgileTeams",
                  Item: sprintRecord
              });
            }
        });
    }
    return NextResponse.json(
      retroSprints
    );
  } catch (error) {
      console.error(error);
      return new NextResponse("Internal Server Error", { status: 500 });
  }
}