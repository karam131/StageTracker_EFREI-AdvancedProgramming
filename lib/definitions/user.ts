
export enum StaffRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export type User = {
  id: string,
  email: string,
  password: string,
  // role: StaffRole,
}
