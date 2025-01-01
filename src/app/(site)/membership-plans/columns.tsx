"use client";

import { FullMembershipPlanType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./_components/cell-action";

export const columns: ColumnDef<FullMembershipPlanType>[] = [
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
