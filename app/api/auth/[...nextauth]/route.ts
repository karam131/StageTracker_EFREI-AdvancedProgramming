// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import { RequestInternal, Awaitable, User } from "next-auth";

// const prisma = new PrismaClient();

// export const authOptions = {
//    adapter: PrismaAdapter(prisma),
//    providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         username: { label: "Username", type: 'text', placeholder: "jsmith" },
//       },
//       authorize: function (credentials: Record<"username", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Awaitable<User | null> {
//         throw new Error("Function not implemented.");
//       }
//     })
//    ]
// }