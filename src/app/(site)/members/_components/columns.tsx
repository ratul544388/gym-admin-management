"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { capitalize, formatDate, getStatus } from "@/lib/utils";
import { FullMemberType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { StatusHeaderPopover } from "./status-header-popover";
import { TableGenderHeader } from "./table-gender-header";

export const columns: ColumnDef<FullMemberType>[] = [
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
    accessorKey: "memberId",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original.phone;
      if (phone) return phone;
      return <span className="text-muted-foreground">N/A</span>;
    },
  },
  {
    accessorKey: "gender",
    header: () => <TableGenderHeader />,
    cell: ({ row }) => {
      const gender = row.original.gender;
      if (gender) return capitalize(gender);
      return <span className="text-muted-foreground">N/A</span>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const address = row.original.address;
      if (address) return address;
      return <span className="text-muted-foreground">N/A</span>;
    },
  },
  {
    accessorKey: "MembershipPlan",
    header: "Membership Plan",
    cell: ({ row }) => {
      const membershipPlan = row.original.membershipPlan.name;
      return capitalize(membershipPlan);
    },
  },
  {
    accessorKey: "status",
    header: () => <StatusHeaderPopover />,
    cell: ({ row }) => {
      const lastMembershipPlanRecord =
        row.original.membershipPlan.membershipRecords[
          row.original.membershipPlan.membershipRecords.length - 1
        ];

      const startDate = lastMembershipPlanRecord.startDate;
      const endDate = lastMembershipPlanRecord.endDate;
      const hasRenewed =
        row.original.membershipPlan.membershipRecords.length > 1;
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
      const lastMembershipPlanRecord =
        row.original.membershipPlan.membershipRecords[
          row.original.membershipPlan.membershipRecords.length - 1
        ];
      return formatDate({ date: lastMembershipPlanRecord.startDate });
    },
  },
  {
    accessorKey: "endDate",
    header: "Expire Date",
    cell: ({ row }) => {
      const lastMembershipPlanRecord =
        row.original.membershipPlan.membershipRecords[
          row.original.membershipPlan.membershipRecords.length - 1
        ];
      return formatDate({ date: lastMembershipPlanRecord.endDate });
    },
  },
  {
    accessorKey: "locker",
    header: "Locker",
    cell: ({ row }) => {
      const startDate = row.original.locker?.lockerRecords[0]?.startDate;
      const endDate = row.original.locker?.lockerRecords[0]?.endDate;
      const hasRenewed =
        !!row.original.locker?.lockerRecords?.length &&
        row.original.locker.lockerRecords.length > 1;

      if (startDate && endDate) {
        const status = getStatus({ startDate, endDate, hasRenewed });
        return capitalize(status);
      }
      return <span className="text-muted-foreground">N/A</span>;
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => <CellAction member={row.original} />,
  },
];
