import type { NextAuthConfig} from 'next-auth';
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import GitHub from "next-auth/providers/github"
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import mongoClient from '@/app/lib/db';

export const authConfig = {
    /*
    pages: {
      signIn: '/login',
    },
    adapter: MongoDBAdapter(mongoClient),
    */
    callbacks: {
      authorized({ auth}) {
        return !!auth
      }
    },
    providers: [
        MicrosoftEntraID({
          clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
          clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
          issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
        }),
        GitHub({
          clientId: process.env.AUTH_GITHUB_ID,
          clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
      ],
  } satisfies NextAuthConfig;