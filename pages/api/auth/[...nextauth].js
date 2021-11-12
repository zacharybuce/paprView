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
        if (!user.votes) {
          try {
            const userPutRes = await fetch(
              process.env.NEXT_PUBLIC_ROOT_URL + "/api/users/" + user.id,
              {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  votes: [],
                }),
              }
            );
            const userPutData = await userPutRes.json();
            console.log(userPutData);
          } catch (error) {
            console.log(error);
          }
        }
        if (!user.joinDate) {
          try {
            var d1 = new Date();
            var str = d1.toISOString().slice(0, -5);

            const userPutRes = await fetch(
              process.env.NEXT_PUBLIC_ROOT_URL + "/api/users/" + user.id,
              {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  date: str,
                }),
              }
            );
            const userPutData = await userPutRes.json();
            console.log(userPutData);
          } catch (error) {
            console.log(error);
          }
        }
        return true;
      },
      async session({ session, token, user }) {
        session.user._id = user.id;
        session.user.votes = user.votes;
        session.user.joinDate = user.joinDate;
        return session;
      },
    },
  });
}
