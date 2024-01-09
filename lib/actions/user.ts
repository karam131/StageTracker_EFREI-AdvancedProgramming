import { generateUUID } from "@/lib/utils";
import { db } from "../db";

export async function createFirstUser( email: string, password: string) {
    const newUserUUID = generateUUID();

    try {
        const newUser = await db.user.create({
            data: {
                id: newUserUUID,
                email: email,
                password: password,
            },
        });

        return newUser;
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to create new user.' };
    }
}
