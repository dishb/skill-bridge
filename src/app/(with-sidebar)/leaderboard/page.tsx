"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { getLeaders } from "@/app/actions/hours";
import { Crown, ArrowUpRight } from "lucide-react";
import type Leader from "@/types/leader";

const columns: ColumnDef<Leader>[] = [
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const pos = row.original.position;

      if (pos === 1) {
        return (
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-auto text-yellow-500" /> {pos}
          </div>
        );
      } else if (pos === 2) {
        return (
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-auto text-gray-400" /> {pos}
          </div>
        );
      } else if (pos === 3) {
        return (
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-auto text-yellow-700" /> {pos}
          </div>
        );
      }

      return pos;
    },
  },
  {
    accessorKey: "userName",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link
          href={`/profile/${row.original.userId.toString()}`}
          className="flex items-center gap-1 hover:underline"
        >
          {row.original.userName}
          <ArrowUpRight className="w-5 h-auto" />
        </Link>
      );
    },
  },
  {
    accessorKey: "totalHours",
    header: "Hours",
    cell: ({ row }) => {
      return <>{row.original.totalHours.toFixed(1)}</>;
    },
  },
];

export default function GoalHistory() {
  const [data, setData] = useState<Column[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function handleFetchLeaders() {
      const res = await getLeaders();
      if (res.ok && Array.isArray(res.leaders)) {
        const leadersWithPosition = res.leaders.map((leader, index) => ({
          position: index + 1,
          userName: leader.userName,
          totalHours: leader.totalHours,
          userId: leader.userId,
        }));
        setData(leadersWithPosition);
      }
    }

    handleFetchLeaders();

    const interval = setInterval(() => {
      handleFetchLeaders();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Leaderboard</CardTitle>
        <CardDescription className="text-lg">
          View the top 20 volunteers worldwide, updated live.
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
                              header.getContext(),
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
                          cell.getContext(),
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
