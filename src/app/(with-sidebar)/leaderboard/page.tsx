"use client";

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
import { getLeaders } from "@/app/actions/hours";

interface ColumnType {
  position: number;
  userName: string;
  totalHours: number;
}

const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "userName",
    header: "Name",
  },
  {
    accessorKey: "totalHours",
    header: "Hours",
  },
];

export default function GoalHistory() {
  const [data, setData] = useState<
    {
      position: number;
      userName: string;
      totalHours: number;
    }[]
  >([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  async function handleFetchLeaders() {
    const res = await getLeaders();
    if (res.ok && Array.isArray(res.leaders)) {
      const leadersWithPosition = res.leaders.map((leader, index) => ({
        position: index + 1,
        userName: leader.userName,
        totalHours: leader.totalHours,
      }));
      setData(leadersWithPosition);
    }
  }

  useEffect(() => {
    handleFetchLeaders();

    const interval = setInterval(() => {
      handleFetchLeaders();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
