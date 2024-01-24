"use server";

import { signIn } from "@/auth";
import { findUserByEmail } from "@/lib/data/user";
import { redirect } from "next/navigation";
import { z } from "zod";
import { hash } from "bcrypt";
import { createFirstUser } from "./user";
import { StaffRole } from "@prisma/client";

const FormSchema = z.object({
  firstName: z.string().min(1, { message: "Entrez votre prénom" }),
  lastName: z.string().min(1, { message: "Entrez votre nom" }),
  email: z.string().email({
    message: "Saisissez une adresse email",
  }),
  password: z.string().min(8, {
    message: "Votre mot de passe doit faire au minimum 8 caractères",
  }),
  role: z.nativeEnum(StaffRole),
});

const CreateUser = FormSchema;

// This is temporary
export type RegisterFormState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
  };
  message?: string | null;
};

export async function signUp(prevState: RegisterFormState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateUser.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Champs manquants. La création de l'utilisateur a échoué.",
    };
  }

  const { firstName, lastName, email, password, role } = validatedFields.data;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return { message: "User already exists." };
    }
    const hashedPassword = await hash(password, 10);
    await createFirstUser(firstName, lastName, email, hashedPassword, role);
  } catch (error) {
    console.error("Register Error:", error);
    return { message: "Register Error: Failed to create new user." };
  }

  redirect("/sign-in/");
}

export async function authenticateSaaSUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignin";
    }
    throw error;
  }
}
