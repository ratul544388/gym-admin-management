"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { useWarningModal } from "@/hooks/use-warning-modal";
import { cn } from "@/lib/utils";
import { ActionReturnedType, DropdownMenuItemType } from "@/types";
import { Table } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useMemo } from "react";

interface Id {
  id: string;
}

interface TableActionHeaderProps<TData extends Id> {
  table: Table<TData>;
  onDelete: (ids: string[]) => ActionReturnedType;
}

export const TableActionHeader = <TData extends Id>({
  table,
  onDelete,
}: TableActionHeaderProps<TData>) => {
  const rowSelection = table.getState().rowSelection;
  const selectedIds = useMemo(() => {
    return table.getSelectedRowModel().rows.map((r) => r.original.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection, table]);

  const { openModal, setOpenModal, WarningModal } = useWarningModal({
    title: "Delete selected rows",
    description: "Are you sure you want to delete selected rows parmanently",
    onDelete: () => onDelete(selectedIds),
    onSuccess: () => {
      table.toggleAllPageRowsSelected(false);
    },
  });

  const items: DropdownMenuItemType[] = [
    {
      icon: Trash2,
      label: "Delete Selected rows",
      onClick: () => setOpenModal(!openModal),
      destructive: true,
      disabled: selectedIds.length === 0,
    },
  ];

  return (
    <>
      <DropDownMenu
        items={items}
        triggerClassName={cn(
          buttonVariants({ variant: "ghost", size: "icon" })
        )}
      >
        <MoreHorizontal className="size-5" />
      </DropDownMenu>
      {openModal && WarningModal}
    </>
  );
};
