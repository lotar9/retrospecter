import client from "@/app/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {

    const session = await auth();
    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // Get all teams where the user is a member
        const team = await client.query({
        TableName: "AgileTeams",
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :pk AND begins_with(GSI1SK, :sk)",
        ExpressionAttributeValues: {
            ":pk": `TEAM#${params.teamId}`,
            ":sk": `METADATA#${params.teamId}`
        }
        });

        if (!team.Items || team.Items.length === 0) {
            return NextResponse.json([]);
        }
        return NextResponse.json(
            team.Items[0]
        );
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}