import { generateUUID } from "@/lib/utils";
import { db } from "../db";
import { StaffRole } from "@prisma/client";
// A MDODIFIER POUR LES ROLES
export async function createFirstUser( email: string, password: string, role:StaffRole) {
    const newUserUUID = generateUUID();

    try {
        const newUser = await db.user.create({
            data: {
                id: newUserUUID,
                email: email,
                password: password,
                role: role,
            },
        });

        return newUser;
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to create new user.' };
    }
}
