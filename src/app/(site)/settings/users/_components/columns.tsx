"use client";

import { UserType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { capitalize } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, image } = row.original;
      return (
        <div className="flex items-center space-x-2">
          <UserAvatar src={image} alt={name} />
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => capitalize(row.original.role),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => <CellAction user={row.original} />,
  },
];
