import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/app/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string; sprintId: string } }
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
        ":pk": `SPRINT#${params.sprintId}`,
        ":sk": "CARD#"
      }
    });

    return NextResponse.json(result.Items);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { teamId: string; sprintId: string } }
) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const cardId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    await client.put({
      TableName: "RetroApp",
      Item: {
        PK: `SPRINT#${params.sprintId}`,
        SK: `CARD#${cardId}`,
        GSI1PK: `TEAM#${params.teamId}`,
        GSI1SK: `CATEGORY#${body.category}`,
        type: "CARD",
        content: body.content,
        category: body.category,
        createdAt: timestamp,
        createdBy: session.user.id,
        votes: 0,
        comments: 0
      }
    });

    return NextResponse.json({ cardId });
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