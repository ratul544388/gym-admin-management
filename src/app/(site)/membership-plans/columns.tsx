"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FullMembershipPlanType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./_components/cell-action";

export const columns: ColumnDef<FullMembershipPlanType>[] = [
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
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
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
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "memberCount",
    header: "Member Count",
    cell: ({row}) => row.original._count.members
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => <CellAction membershipPlan={row.original} />,
  },
];
