import { db } from "../db";
import { Internship } from "../definitions/internship";

export async function getInternships(studentId: string): Promise<Internship[]> {
  try {
    const internships = await db.internship.findMany({
      where: { studentId: studentId },
    });
    return internships as Internship[];
  } catch (error) {
    console.error("Error fetching internships:", error);
    throw new Error("Failed to fetch internships");
  }
}
