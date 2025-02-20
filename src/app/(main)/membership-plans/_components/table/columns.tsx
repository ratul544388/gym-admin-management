"use client";

import { deleteMembershipPlans } from "@/actions/membership-plans";
import { TableActionHeader } from "@/components/table-action-header";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/lib/utils";
import { MembershipPlan } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./action-cell";

export const columns: ColumnDef<MembershipPlan>[] = [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "durationInMonth",
    header: "Duration",
    cell: ({ row }) => {
      function formatDuration(durationInMonth: number): string {
        if (durationInMonth % 12 === 0) {
          return `${durationInMonth / 12} year${
            durationInMonth === 12 ? "" : "s"
          }`;
        }
        return `${durationInMonth} month${durationInMonth > 1 ? "s" : ""}`;
      }

      return formatDuration(row.original.durationInMonth);
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatPrice(row.original.price),
  },
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableActionHeader onDelete={deleteMembershipPlans} table={table} />
    ),
    cell: ({ row, table }) => (
      <ActionCell table={table} membershipPlan={row.original} />
    ),
  },
];
