import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"

import { DynamoDBAdapter } from "@auth/dynamodb-adapter"
import client from "@/app/lib/db"


 
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(
    {
        ...authConfig,
        adapter: DynamoDBAdapter(client),
        session: { strategy: "jwt" },

    }
);