"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { capitalize, formatDate, getStatus } from "@/lib/utils";
import { FullLockerType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<FullLockerType>[] = [
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
      const startDate = row.original.lockerRecords[0]?.startDate;
      const endDate = row.original.lockerRecords[0]?.endDate;
      if (!startDate || !endDate) {
        return <Badge variant="green">Available</Badge>;
      }
      const status = getStatus({ startDate, endDate, hasRenewed: false });
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
      const startDate = row.original.lockerRecords[0]?.startDate;
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
      const endDate = row.original.lockerRecords[0]?.endDate;
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
