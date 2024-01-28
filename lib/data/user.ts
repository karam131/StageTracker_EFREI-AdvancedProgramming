import type { User } from "@/lib/definitions/user";
import { db } from "../db";

export async function getUser(email: string){
  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.error("findUserByEmail Error:", error);
    return { message: "findUserByEmail Error: Failed to fetch user." };
  }
}
