"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import type Goal from "@/types/goal";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "./ui/badge";
import { Check, X, Clock } from "lucide-react";

const data: Goal[] = [];

const columns: ColumnDef<Goal>[] = [
  {
    accessorKey: "hours",
    header: "Hours",
  },
  {
    accessorKey: "Time left",
    header: "Time left",
    cell: ({ row }) => {
      const dueDate = new Date(row.original.dueDate);
      const now = new Date();
      const timeLeft = dueDate.getTime() - now.getTime();
      const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      return `${daysLeft} days`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.original.status;
      if (status === "completed") {
        return (
          <Badge
            variant="secondary"
            className="text-white bg-green-500 dark:bg-green-600"
          >
            <Check /> Completed
          </Badge>
        );
      } else if (status === "in-progress") {
        return (
          <Badge
            variant="secondary"
            className="text-white bg-yellow-500 dark:bg-yellow-600"
          >
            <Clock /> In progress
          </Badge>
        );
      } else if (status === "not-started") {
        return (
          <Badge
            variant="secondary"
            className="text-white bg-red-500 dark:bg-red-600"
          >
            <X /> Not started
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "createdOn",
    header: "Created on",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdOn"));
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);

      return <>{formattedDate}</>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "End date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"));
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);

      return <>{formattedDate}</>;
    },
  },
];

export default function GoalHistory() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-3xl">Goal History</CardTitle>
        <CardDescription className="text-lg">
          View your past goals and their completion status.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full h-full justify-center items-center gap-4">
        <div className="rounded-md border w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
