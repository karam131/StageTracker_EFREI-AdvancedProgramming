"use server";
import { createClient } from "@supabase/supabase-js";
import { generateUUID } from "@/lib/utils";
import { db } from "../db";
import { InternshipData, InternshipStatus } from "../definitions/internship";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

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
  description: z
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
    description?: string[];
    salary?: string[];
  };
  message?: string | null;
}

export async function createInternship(
  prevState: InternshipFormState,
  formData: FormData
) {
  const session = await auth();
  const studentId = session?.user.id;
  const status = InternshipStatus.PENDING;
  let contractUrl = "";
  const validatedFields = CreateInternship.safeParse({
    companyName: formData.get("companyName"),
    companyAddress: formData.get("companyAddress"),
    companyCity: formData.get("companyCity"),
    companyZipCode: formData.get("companyZipCode"),
    tutorName: formData.get("tutorName"),
    tutorPhone: formData.get("tutorPhone"),
    tutorEmail: formData.get("tutorEmail"),
    description: formData.get("description"),
    salary: formData.get("salary"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Champs manquants. La création de l'utilisateur a échoué.",
    };
  }
  // SENDING FILE TO SUPABASE
  const supabase = createClient(
    "https://vrzoxvlgupmhhwghpgpm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyem94dmxndXBtaGh3Z2hwZ3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MTEwMjAsImV4cCI6MjAyMDM4NzAyMH0.CKAVL1afCsnwaI3B1g4r45-dN3et_bepSBp0apQ9v6s"
  );
  const file = formData.get("fileUpload");
  const { data, error } = await supabase.storage
    .from("contractFile")
    .upload("public/" + studentId, file as File);
  if (data) {
    contractUrl = data.path;
  } else if (error) {
    console.log(error);
  }
  const {
    companyName,
    companyAddress,
    companyCity,
    companyZipCode,
    tutorName,
    tutorPhone,
    tutorEmail,
    description,
    salary,
  } = validatedFields.data;

  try {
    await createInternshipDb({
      studentId,
      companyName,
      companyAddress,
      companyCity,
      companyZipCode,
      tutorName,
      tutorPhone,
      tutorEmail,
      description,
      salary,
      status,
      contractUrl,
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
        studentId: data.studentId,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        companyCity: data.companyCity,
        companyZipCode: data.companyZipCode,
        tutorName: data.tutorName,
        tutorPhone: data.tutorPhone,
        tutorEmail: data.tutorEmail,
        description: data.description,
        salary: data.salary,
        status: data.status,
        contractUrl: data.contractUrl,
      },
    });

    return newInternship;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to create new internship." };
  }
}
