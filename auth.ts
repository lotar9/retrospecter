import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"
import mongoClient from "@/app/lib/db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"


 
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(
    {
        ...authConfig,
        adapter: MongoDBAdapter(mongoClient),
        session: { strategy: "jwt" },

    }
);