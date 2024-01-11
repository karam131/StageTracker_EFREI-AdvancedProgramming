import type { User } from "@/lib/definitions/user";
import { db } from "../db";

export async function getUser(email: string): Promise<User> {
  try {
    // Utiliser Prisma pour récupérer l'utilisateur
    const user = await db.user.findUnique({
      where: { email: email },
    });
    console.log(user);
    return user as User; // Convertit null en undefined
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function findUserByEmail(email: string) {
  try {
    // Utiliser Prisma pour rechercher l'utilisateur
    console.log(email);

    const user = await db.user.findUnique({
      where: { email: email },
    });
    console.log("hey");
    return user;
  } catch (error) {
    console.error("findUserByEmail Error:", error);
    return { message: "findUserByEmail Error: Failed to fetch user." };
  }
}
