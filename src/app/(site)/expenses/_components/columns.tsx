"use client";

import { formatDate } from "@/lib/utils";
import { Expense } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => formatDate({ date: row.original.createdAt }),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => <CellAction expense={row.original} />,
  },
];
