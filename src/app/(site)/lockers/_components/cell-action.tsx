"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useModalStore } from "@/hooks/use-modal-store";
import { DropdownMenuItemType, FullLockerType } from "@/types";
import { CheckCircle, Edit, MoreVertical, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CellActionProps {
  locker: FullLockerType;
}

export const CellAction = ({ locker }: CellActionProps) => {
  const router = useRouter();
  const { onOpen } = useModalStore();
  const items: DropdownMenuItemType[] = [
    {
      icon: Edit,
      label: "Renew Locker",
      onClick: () => router.push(`/membership-plans/${locker.id}/edit`),
    },
    ...(locker.member
      ? [
          {
            label: "Unassign Locker",
            onClick: () => router.push(`/members/${""}`),
            icon: X,
          },
        ]
      : [
          {
            label: "Assign Locker",
            onClick: () => router.push(`/members/${""}`),
            icon: CheckCircle,
          },
        ]),
    {
      icon: Trash2,
      label: "Delete Locker",
      onClick: () => onOpen("deleteLockerModal", { ids: [locker.id] }),
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
