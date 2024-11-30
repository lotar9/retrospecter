
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@/app/lib/db";

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const result = await client.query({
      TableName: "RetroApp",
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
      ExpressionAttributeValues: {
        ":pk": `USER#${session.user.email}`,
        ":sk": "TEAM#"
      }
    });
    console.log(result);

    return NextResponse.json(result.Items);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const teamId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    await client.transactWrite({
      TransactItems: [
        {
          Put: {
            TableName: "RetroApp",
            Item: {
              PK: `TEAM#${teamId}`,
              SK: "METADATA#1",
              type: "TEAM",
              name: body.name,
              description: body.description,
              createdAt: timestamp,
              createdBy: session.user.id
            }
          }
        },
        {
          Put: {
            TableName: "RetroApp",
            Item: {
              PK: `USER#${session.user.id}`,
              SK: `TEAM#${teamId}`,
              type: "TEAM_MEMBER",
              role: "ADMIN",
              joinedAt: timestamp
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