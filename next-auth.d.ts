import { Session } from "next-auth";
import { JWT } from "@auth/core/jwt";
import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      email: string;
      role: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
  }
}
