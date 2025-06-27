"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { getPastOpportunities } from "@/app/actions/opportunity";
import type Opportunity from "@/types/opportunity";

const columns: ColumnDef<Opportunity>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdBy",
    header: "Created by",
  },
  {
    accessorKey: "claimedOn",
    header: "Claimed on",
    cell: ({ row }) => {
      const date = new Date(row.getValue("claimedOn"));
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
    header: "Due date",
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

export default function PastVolunteering() {
  const [data, setData] = useState<any[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function loadPastOpportunities() {
      const res = await getPastOpportunities();
      if (res.ok) {
        setData(res.opportunities ?? []);
      }
    }

    loadPastOpportunities();

    const interval = setInterval(() => {
      loadPastOpportunities();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-3xl">Past Volunteering</CardTitle>
        <CardDescription className="text-lg">
          View volunteer opportunities that you claimed and completed.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
