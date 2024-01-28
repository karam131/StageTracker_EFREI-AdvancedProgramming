"use client";
import React, { useEffect, useState } from "react";
// import { getInternships } from "@/lib/data/internship";
import { Internship } from "@/lib/definitions/internship";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/definitions/user";

const headers: { [key: string]: string } = {
  status: "Status", // status : pending, accepted, rejected
  name: "Tutor Name", // contiendra nom prenom
  company: "Company", // company name
  salary: "Salary", // salaire
  action: "Action", // voir détail
};

export default function StudentBoard({
  internships,
}: {
  internships: Internship[];
}) {
  return (
    <div className=" w-[80%] h-[70dvh] overflow-y-scroll hide-scrollbar">
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(headers).map((title) => (
              <TableHead key={title}>{headers[title]}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {internships.map((internship, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex gap-2 justify-start items-center">
                <div className={`w-3 h-3 rounded-full ${internship.status === 'PENDING' ? 'bg-orange-400' : internship.status === 'ACCEPTED' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  {internship.status}
                </div>
              </TableCell>
              <TableCell>{internship.tutorName}</TableCell>
              <TableCell>{internship.companyName}</TableCell>
              <TableCell>{internship.salary}</TableCell>
              <TableCell>
                <button>voir plus</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
