import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function studentBoard() {
  const headers: { [key: string]: string } = {
    status: "Status", // status : pending, accepted, rejected
    name: "Name",  // contiendra nom prenom
    company: "Company", // company name
    salary: "Salary", // salaire
    action: "Action", // voir détail
  };
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
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
