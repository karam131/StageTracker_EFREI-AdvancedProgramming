import { auth, signOut } from "@/auth";
import StudentBoard from "@/components/pages/studentBoard";
import { getInternships } from "@/lib/data/internship";
import React from "react";

export default async function StudentDashboard(){
  const session = await auth()
  if(session?.user.role !=='STUDENT'){
    throw new Error('You need to be student.')
  }
  const userId = session.user.id;
  const intern= await getInternships(userId);
  return (
    <div className="flex justify-center items-center h-full w-full pt-4">
      <StudentBoard internships={intern} />
    </div>
  );
};


