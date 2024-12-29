"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import UserAvatar from "@/components/user-avatar";
import { placeholderImage } from "@/constants";
import { capitalize, formatDate, getStatus } from "@/lib/utils";
import { FullMemberType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { CellAction } from "./cell-action";
import { StatusHeaderPopover } from "./status-header-popover";
import { TableGenderHeader } from "./table-gender-header";
import { TableHeaderMembershipPlan } from "./table-header-membership-plan";

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
    cell: ({ row }) => {
      const name = row.original.name;
      const imageUrl = row.original.imageUrl || placeholderImage;
      const href = `/members${row.original.id}/profile`;
      return (
        <Link href={href} className="group flex items-center gap-2 pr-6">
          <UserAvatar avatarUrl={imageUrl} />
          <p className="group-hover:underline">{name}</p>
        </Link>
      );
    },
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
    header: () => <TableHeaderMembershipPlan />,
    cell: ({ row }) => {
      const membershipPlan = row.original.membershipPlan.name;
      return capitalize(membershipPlan);
    },
  },
  {
    accessorKey: "status",
    header: () => <StatusHeaderPopover />,
    cell: ({ row }) => {
      const {
        membershipPlanStartDate: startDate,
        membershipPlanEndDate: endDate,
        isMembershipPlanRenewed: hasRenewed,
      } = row.original;
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
    cell: ({ row }) =>
      formatDate({ date: row.original.membershipPlanStartDate }),
  },
  {
    accessorKey: "endDate",
    header: "Expire Date",
    cell: ({ row }) => formatDate({ date: row.original.membershipPlanEndDate }),
  },
  {
    accessorKey: "locker",
    header: "Locker",
    cell: ({ row }) => {
      const {
        lockerStartDate: startDate,
        lockerEndDate: endDate,
        isLockerRenewed: hasRenewed,
        lockerId,
      } = row.original;

      if (!lockerId) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      if (startDate && endDate) {
        const status = getStatus({
          startDate,
          endDate,
          hasRenewed,
        });
        return capitalize(status);
      }
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => <CellAction member={row.original} />,
  },
];
