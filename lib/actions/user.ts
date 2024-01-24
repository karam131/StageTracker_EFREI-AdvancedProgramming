import { generateUUID } from "@/lib/utils";
import { db } from "../db";
import { StaffRole } from "@prisma/client";
export async function createFirstUser(firstName: string, lastName: string, email: string, password: string, role: StaffRole) {
    const newUserUUID = generateUUID();

    try {
        const newUser = await db.user.create({
            data: {
                id: newUserUUID,
                firstname: firstName,
                lastname: lastName,
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
