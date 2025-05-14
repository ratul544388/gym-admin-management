"use client";

import { deleteMembershipPlans } from "@/app/(main)/membership-plans/actions";
import { DropDownMenu } from "@/components/dropdown-menu";
import { useWarningModal } from "@/hooks/use-warning-modal";
import { DropdownMenuItemType } from "@/types";
import { MembershipPlan } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionCellProps {
  membershipPlan: MembershipPlan;
  table: Table<MembershipPlan>;
}

export const ActionCell = ({ membershipPlan, table }: ActionCellProps) => {
  const router = useRouter();
  const { WarningModal, openModal, setOpenModal } = useWarningModal({
    title: "Delete Membership Plan",
    onDelete: () => deleteMembershipPlans([membershipPlan.id]),
    onSuccess: () => {
      const row = table
        .getSelectedRowModel()
        .rows.find((r) => r.original.id === membershipPlan.id);

      if (row) {
        table.setRowSelection((prev) => {
          const newSelection = { ...prev };
          delete newSelection[row.id];
          return newSelection;
        });
      }
    },
  });
  const items: DropdownMenuItemType[] = [
    {
      label: "Edit Membership Plan",
      icon: Edit,
      onClick: () => router.push(`/membership-plans/${membershipPlan.id}/edit`),
    },
    {
      label: "Delete Membership Plan",
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
