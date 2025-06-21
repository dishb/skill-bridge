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
import { useState, useEffect } from "react";

const columns: ColumnDef<Goal>[] = [
  {
    accessorKey: "hours",
    header: "Hours",
  },
  {
    accessorKey: "timePassed",
    header: "Time passed",
    cell: ({ row }) => {
      const createdOn = new Date(row.original.createdOn);
      const now = new Date();
      const timeLeft = now.getTime() - createdOn.getTime();
      const daysPassed = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      return <>{`${daysPassed} days`}</>;
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
];

export default function GoalHistory() {
  const [data, setData] = useState<Goal[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  async function handleFetchGoals() {
    const res = await fetch("/api/get-goals", { method: "GET" });
    const goals = await res.json();
    setData(goals);
  }

  useEffect(() => {
    handleFetchGoals();
  }, []);

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
