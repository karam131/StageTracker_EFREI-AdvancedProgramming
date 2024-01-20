export enum StaffRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export type User = {
  id: string,
  email: string,
  password: string,
  role: StaffRole,
}
