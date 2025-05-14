"use client";

import { CopyButton } from "@/components/copy-button";
import { NotProvided } from "@/components/not-provided";
import { TableActionHeader } from "@/components/table-action-header";
import { Checkbox } from "@/components/ui/checkbox";
import UserAvatar from "@/components/user-avatar";
import { capitalize, formatDate } from "@/lib/utils";
import { FullMemberType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./action-cell";
import { GenderHeader } from "./gender-header";
import { MembershipPlanHeader } from "./membership-plan-header";
import { StatusCell } from "./status-cell";
import { StatusHeader } from "./status-header";
import { deleteMembers } from "../../actions";

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
        onCheckedChange={(value) => row.toggleSelected(!!value)}
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
      const { image, name } = row.original;
      return (
        <article className="flex items-center gap-2">
          <UserAvatar src={image} fallback={name} />
          <p className="font-medium text-sm">{name}</p>
        </article>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const { phone } = row.original;
      if (phone) {
        return (
          <div className="flex items-center gap-1">
            {phone}
            <CopyButton text={phone} />
          </div>
        );
      }
      return <NotProvided />;
    },
  },
  {
    accessorKey: "gender",
    header: () => <GenderHeader />,
    cell: ({ row }) => {
      const { gender } = row.original;
      if (gender) {
        return <p className="ml-4">{capitalize(gender)}</p>;
      }
      return <NotProvided className="mx-4" />;
    },
  },
  {
    accessorKey: "membershipPlan",
    header: () => <MembershipPlanHeader />,
    cell: ({ row }) => {
      const membershipPlanName = row.original.membershipPlan.name;
      return <p className="ml-4">{membershipPlanName}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <StatusHeader />,
    cell: ({ row }) => <StatusCell member={row.original} />,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.original.startDate),
  },
  {
    accessorKey: "endDate",
    header: "Expire Date",
    cell: ({ row }) => formatDate(row.original.endDate),
  },
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableActionHeader onDelete={deleteMembers} table={table} />
    ),
    cell: ({ row, table }) => (
      <ActionCell table={table} member={row.original} />
    ),
  },
];
