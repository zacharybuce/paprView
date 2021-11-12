import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter({
      db: (await clientPromise).db("myFirstDatabase"),
    }),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true;
      },
      async session({ session, token, user }) {
        session.user._id = user.id;
        session.user.votes = user.votes;
        session.user.joinDate = user.joinDate;
        return session;
      },
    },
    pages: {
      signIn: "/",
      signOut: "/",
      error: "/auth/error", // Error code passed in query string as ?error=
      verifyRequest: "/auth/verify-request", // (used for check email message)
      newUser: process.env.NEXT_PUBLIC_ROOT_URL + "/newuser",
    },
  });
}
