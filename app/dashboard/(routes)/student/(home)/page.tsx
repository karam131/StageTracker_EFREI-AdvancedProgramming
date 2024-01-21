import { auth, signOut } from "@/auth";
import StudentBoard from "@/components/pages/studentBoard";
import { PowerIcon } from "@heroicons/react/24/outline";
import React from "react";

export default async function StudentDashboard(){
  const session = await auth()
  if(session?.user.role !=='STUDENT'){
    throw new Error('You need to be student.')
  }
  return (
    <div className="flex justify-center items-center h-full w-full">
      <StudentBoard/>
    </div>
  );
};


