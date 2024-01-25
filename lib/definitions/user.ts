import { Internship } from "@prisma/client"

export enum StaffRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export type User = {
  id: string,
  firstname: string,
  lastname: string, 
  email: string,
  password: string,
  role: StaffRole,
  internships: Internship,
}
