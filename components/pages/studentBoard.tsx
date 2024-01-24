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
    status: "Status",
    name: "Name",
    company: "Company",
    salary: "Salary",
    action: "Action",
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
