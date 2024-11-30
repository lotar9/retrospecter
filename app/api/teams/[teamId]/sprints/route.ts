
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/app/lib/db";
export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const result = await client.query({
      TableName: "RetroApp",
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
      ExpressionAttributeValues: {
        ":pk": `TEAM#${params.teamId}`,
        ":sk": "SPRINT#"
      }
    });

    return NextResponse.json(result.Items);
  } catch (error) {
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