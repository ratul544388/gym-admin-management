"use client";

import { deleteMembers } from "@/actions/members";
import { DropDownMenu } from "@/components/dropdown-menu";
import { today } from "@/constants";
import { useWarningModal } from "@/hooks/use-warning-modal";
import { DropdownMenuItemType, FullMemberType } from "@/types";
import { Table } from "@tanstack/react-table";
import { differenceInDays } from "date-fns";
import { Calendar, Edit, MoreVertical, Trash2, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionCellProps {
  member: FullMemberType;
  table: Table<FullMemberType>;
}

export const ActionCell = ({ member, table }: ActionCellProps) => {
  const router = useRouter();
  const { WarningModal, openModal, setOpenModal } = useWarningModal({
    title: "Delete Member",
    description:
      "It will permanently delete the member. This action cannot be undone",
    onDelete: () => deleteMembers([member.id]),
    onSuccess: () => {
      const row = table
        .getSelectedRowModel()
        .rows.find((r) => r.original.id === member.id);

      if (row) {
        table.setRowSelection((prev) => {
          const newSelection = { ...prev };
          delete newSelection[row.id];
          return newSelection;
        });
      }
    },
  });

  const isMembershipPlanRenewable =
    differenceInDays(member.endDate, today) <= 7;

  const items: DropdownMenuItemType[] = [
    {
      label: "View Profile",
      icon: User2,
      onClick: () => {},
    },
    {
      label: "Edit Member",
      icon: Edit,
      onClick: () => router.push(`/members/edit/${member.id}`),
    },
    ...(isMembershipPlanRenewable
      ? [
          {
            icon: Calendar,
            label: "Renew Membership Plan",
            onClick: () => router.push(`/members/renew/${member.id}`),
          },
        ]
      : []),
    {
      label: "Delete Member",
      icon: Trash2,
      onClick: () => setOpenModal(true),
      destructive: true,
    },
  ];
  return (
    <>
      <DropDownMenu
        items={items}
        align="end"
        triggerClassName="p-2 rounded-full"
      >
        <MoreVertical className="size-4" />
      </DropDownMenu>
      {openModal && WarningModal}
    </>
  );
};
