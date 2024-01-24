"use server";

import { generateUUID } from "@/lib/utils";
import { db } from "../db";
import { InternshipData } from "../definitions/internship";
import { z } from "zod";
import { redirect } from "next/navigation";

const InternshipSchema = z.object({
  companyName: z.string().min(1, { message: "Entrez le nom de l'entreprise" }),
  companyAddress: z
    .string()
    .min(1, { message: "Entrez l'adresse de l'entreprise" }),
  companyCity: z
    .string()
    .min(1, { message: "Entrez la ville de l'entreprise" }),
  companyZipCode: z
    .string()
    .min(1, { message: "Entrez le code postal de l'entreprise" }),
  tutorName: z.string().min(1, { message: "Entrez le nom du tuteur" }),
  tutorPhone: z.string().min(1, { message: "Entrez le téléphone du tuteur" }),
  tutorEmail: z
    .string()
    .email({ message: "Saisissez une adresse email valide pour le tuteur" }),
  internshipDescription: z
    .string()
    .min(1, { message: "Entrez une description du stage" }),
  salary: z.string().min(1, { message: "Entrez le salaire du stage" }),
});

const CreateInternship = InternshipSchema;

interface InternshipFormState {
  errors?: {
    companyName?: string[];
    companyAddress?: string[];
    companyCity?: string[];
    companyZipCode?: string[];
    tutorName?: string[];
    tutorPhone?: string[];
    tutorEmail?: string[];
    internshipDescription?: string[];
    salary?: string[];
  };
  message?: string | null;
}



export async function createInternship(prevState: InternshipFormState, formData: FormData) {
  const validatedFields = CreateInternship.safeParse({
    companyName: formData.get("companyName"),
    companyAddress: formData.get("companyAddress"),
    companyCity: formData.get("companyCity"),
    companyZipCode: formData.get("companyZipCode"),
    tutorName: formData.get("tutorName"),
    tutorPhone: formData.get("tutorPhone"),
    tutorEmail: formData.get("tutorEmail"),
    internshipDescription: formData.get("internshipDescription"),
    salary: formData.get("salary"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Champs manquants. La création de l'utilisateur a échoué.",
    };
  }
  const {
    companyName,
    companyAddress,
    companyCity,
    companyZipCode,
    tutorName,
    tutorPhone,
    tutorEmail,
    internshipDescription,
    salary,
  } = validatedFields.data;

  try {
    await createInternshipDb({
      companyName,
      companyAddress,
      companyCity,
      companyZipCode,
      tutorName,
      tutorPhone,
      tutorEmail,
      internshipDescription,
      salary,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return { message: "Upload Error: Failed to create new Internship." };
  }
  redirect("/dashboard/student/");
}

export async function createInternshipDb(data: InternshipData) {
  const newInternshipId = generateUUID();
  try {
    const newInternship = await db.internship.create({
      data: {
        id: newInternshipId,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        companyCity: data.companyCity,
        companyZipCode: data.companyZipCode,
        tutorName: data.tutorName,
        tutorPhone: data.tutorPhone,
        tutorEmail: data.tutorEmail,
        internshipDescription: data.internshipDescription,
        salary: data.salary,
      },
    });

    return newInternship;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to create new internship." };
  }
}
