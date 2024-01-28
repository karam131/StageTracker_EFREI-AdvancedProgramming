
export enum InternshipStatus{
  PENDING= 'PENDING',
  ACCEPTED= 'ACCEPTED',
  REJECTED='REJECTED',
}

export type Internship = {
  studentId: string,  // manquant
  companyName: string,
  companyAddress: string,
  companyCity: string,
  companyZipCode: string,
  tutorName: string,
  tutorPhone: string,
  tutorEmail: string,
  description: string,
  salary: string,
  status: InternshipStatus, // manquant
  contractUrl: string,
};
