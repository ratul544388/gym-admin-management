"use client";

import { Badge } from "@/components/ui/badge";
import { capitalize, formatDate, getStatus } from "@/lib/utils";
import { FullLockerType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<FullLockerType>[] = [
  {
    accessorKey: "lockerNo",
    header: "Locker No.",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { members } = row.original;

      if (!!!members.length) {
        return <Badge variant="green">Available</Badge>;
      }

      const startDate = row.original.members?.[0]?.lockerStartDate;
      const endDate = row.original.members?.[0]?.lockerEndDate;
      const hasRenewed = row.original.members?.[0]?.isLockerRenewed;

      if (!startDate || !endDate) return;

      const status = getStatus({ startDate, endDate, hasRenewed });

      return (
        <Badge
          variant={
            status === "ACTIVE"
              ? "blue"
              : status === "PENDING"
                ? "orange"
                : "destructive"
          }
        >
          {capitalize(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const startDate = row.original.members?.[0]?.lockerStartDate;
      return startDate ? (
        formatDate({ date: startDate })
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date Date",
    cell: ({ row }) => {
      const endDate = row.original.members?.[0]?.lockerEndDate;

      return endDate ? (
        formatDate({ date: endDate })
      ) : (
        <span className="text-muted-foreground">N/A</span>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => <CellAction locker={row.original} />,
  },
];
