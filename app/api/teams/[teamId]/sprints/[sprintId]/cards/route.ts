import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/app/lib/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ teamId: string, sprintId: string }> }
) {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const params = await context.params;
  try {
    const cards = await client.query({
      TableName: "AgileTeams",
      KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
      ExpressionAttributeValues: {
        ":pk": `TEAM#${params.teamId}`,
        ":sk": `SPRINT#${params.sprintId}#COLUMN#`
      }
    });

    return NextResponse.json(cards.Items);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ teamId: string; sprintId: string }> }
) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const params = await context.params
    const body = await request.json();
    const cardId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const card = {
      PK: `TEAM#${params.teamId}`,
      SK: `SPRINT#${params.sprintId}#COLUMN#${body.columnId}CARD#${cardId}`,
      GSI1PK: `SPRINT#${params.sprintId}`,
      GSI1SK: `COLUMN#${body.columnId}`,
      entitytype: "card",
      description: body.content,
      createdAt: timestamp,
      createdBy: session.user.id,
    }

    await client.put({
      TableName: "AgileTeams",
      Item: card
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { teamId: string; sprintId: string } }
) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const timestamp = new Date().toISOString();

    await client.update({
      TableName: "RetroApp",
      Key: {
        PK: `SPRINT#${params.sprintId}`,
        SK: `CARD#${body.cardId}`
      },
      UpdateExpression: "SET content = :content, category = :category, updatedAt = :updatedAt, GSI1SK = :gsi1sk",
      ExpressionAttributeValues: {
        ":content": body.content,
        ":category": body.category,
        ":updatedAt": timestamp,
        ":gsi1sk": `CATEGORY#${body.category}`
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 