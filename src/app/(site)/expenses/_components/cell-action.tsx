"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useModalStore } from "@/hooks/use-modal-store";
import { DropdownMenuItemType } from "@/types";
import { Expense } from "@prisma/client";
import {
  Edit,
  MoreVertical,
  Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";

interface CellActionProps {
  expense: Expense;
}

export const CellAction = ({ expense }: CellActionProps) => {
  const router = useRouter();
  const { onOpen } = useModalStore();
  const items: DropdownMenuItemType[] = [
    {
      icon: Edit,
      label: "Edit Expense",
      onClick: () => router.push(`/expenses/${expense.id}/edit`),
    },
    {
      icon: Trash2,
      label: "Delete Expense",
      onClick: () => onOpen("deleteExpenseModal", { ids: [expense.id] }),
    },
  ];

  return (
    <DropDownMenu
      items={items}
      align="end"
      triggerClassName="p-2 rounded-full hover:bg-accent"
    >
      <MoreVertical className="size-4" />
    </DropDownMenu>
  );
};
