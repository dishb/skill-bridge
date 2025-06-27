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
import {
  getClaimedOpportunities,
  unclaimOpportunity,
} from "@/app/actions/opportunity";
import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const recipientEmail = row.original.contactEmail;
      const documentId = row.original._id;

      async function onClick() {
        try {
          const res = await fetch("/api/send-approval-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipientEmail, documentId }),
          });

          const resJson = await res.json();
          if (!resJson.ok) {
            throw new Error(
              "An error occurred sending the volunteer hours approval request email."
            );
          }
        } catch (err: any) {
          console.log("ERROR", err.message);
        }
      }

      return (
        <div className="flex gap-2">
          <Button onClick={onClick} className="hover:cursor-pointer">
            Request hours <Send />
          </Button>
          <Button
            className="hover:cursor-pointer"
            variant="secondary"
            onClick={async () => {
              await unclaimOpportunity(row.original._id?.toString());
            }}
          >
            Unclaim <X />
          </Button>
        </div>
      );
    },
  },
];

export default function Page() {
  const [data, setData] = useState<any[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  async function loadClaimedOpportunities() {
    const res = await getClaimedOpportunities();
    if (res.ok) {
      setData(res.opportunities ?? []);
    }
  }

  useEffect(() => {
    loadClaimedOpportunities();

    const interval = setInterval(() => {
      loadClaimedOpportunities();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">My Volunteering</CardTitle>
        <CardDescription className="text-lg">
          View and manage your active volunteer opportunities.
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
