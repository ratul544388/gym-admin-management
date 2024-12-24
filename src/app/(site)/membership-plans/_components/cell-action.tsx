"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useModalStore } from "@/hooks/use-modal-store";
import { DropdownMenuItemType, FullMembershipPlanType } from "@/types";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CellActionProps {
  membershipPlan: FullMembershipPlanType;
}

export const CellAction = ({ membershipPlan }: CellActionProps) => {
  const router = useRouter();
  const { onOpen } = useModalStore();
  const items: DropdownMenuItemType[] = [
    {
      icon: Edit,
      label: "Edit Plan",
      onClick: () => router.push(`/membership-plans/${membershipPlan.id}/edit`),
    },
    {
      icon: Trash2,
      label: "Delete Plan",
      onClick: () =>
        onOpen("deleteMembershipPlanModal", { ids: [membershipPlan.id] }),
      destructive: true,
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
