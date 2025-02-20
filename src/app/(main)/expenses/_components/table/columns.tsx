"use client";

import { deleteExpenses } from "@/actions/expenses";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate, formatPrice } from "@/lib/utils";
import { Expense } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./action-cell";
import { TableActionHeader } from "@/components/table-action-header";

export const columns: ColumnDef<Expense>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({row}) => formatPrice(row.original.cost)
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableActionHeader table={table} onDelete={deleteExpenses} />
    ),
    cell: ({ row, table }) => (
      <ActionCell expense={row.original} table={table} />
    ),
  },
];
