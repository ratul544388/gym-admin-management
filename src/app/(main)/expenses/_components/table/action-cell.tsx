"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useWarningModal } from "@/hooks/use-warning-modal";
import { DropdownMenuItemType } from "@/types";
import { Expense } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteExpenses } from "../../actions";

interface ActionCellProps {
  expense: Expense;
  table: Table<Expense>;
}

export const ActionCell = ({ expense, table }: ActionCellProps) => {
  const router = useRouter();
  const { WarningModal, openModal, setOpenModal } = useWarningModal({
    title: "Delete Expense",
    onDelete: () => deleteExpenses([expense.id]),
    onSuccess: () => {
      const row = table
        .getSelectedRowModel()
        .rows.find((r) => r.original.id === expense.id);

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
      label: "Edit Expense",
      icon: Edit,
      onClick: () => router.push(`/expenses/${expense.id}/edit`),
    },
    {
      label: "Delete Expense",
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
