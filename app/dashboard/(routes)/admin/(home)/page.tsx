import { auth, signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function AdminDashboard(){
  // const session = await auth()
  // if(session?.user.role !=='ADMIN'){
  //   throw new Error('You need to be admin.')
  // }
  return (
    <div className="h-full w-full">
      {/* <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-third md:flex-none md:justify-start md:p-2 md:px-3 text-black w-full">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Se déconnecter</div>
        </button>
      </form> */}
      <h1>Admin</h1>
    </div>
  );
};


