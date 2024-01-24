import { signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import Signout from "./signOutButton/signout";

export default function NavbarDashboard({
  firstname,
  lastname,
  role,
  email,
}: {
  firstname: string,
  lastname: string,
  role: string;
  email: string;
}) {
  return (
    <div className="flex bg-[#000832] w-full h-full text-white">
      <div className="h-full w-[250px] ml-10 flex flex-col justify-center items-start">
        <h1>{firstname} {lastname}</h1>
      </div>
      <div className="flex justify-center items-center text-sm gap-10 ml-[200px] ">
        {/* menu */}
        <Link href={'/dashboard/student'}>
          <button className="">
            Board
          </button>
        </Link>
        <Link href={'/dashboard/student/stages'}>
          <button>
            Mes stages
          </button>
        </Link>
      </div>
      <div className="absolute top-3 right-3">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          {/* <button className="flex h-[48px] grow items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-third md:flex-none md:justify-start md:p-2 md:px-3 text-black w-full">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Se déconnecter</div>
          </button> */}
          <Signout/>
        </form>
      </div>
    </div>
  );
}
