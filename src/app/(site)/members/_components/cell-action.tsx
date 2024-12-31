"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useModalStore } from "@/hooks/use-modal-store";
import { FullMemberType } from "@/types";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface CellActionProps {
  member: FullMemberType;
}

export const CellAction = ({ member }: CellActionProps) => {
  const router = useRouter();
  const { onOpen } = useModalStore();

  const { membershipPlanEndDate, id } = member;

  const isRenewable =
    membershipPlanEndDate.getTime() - new Date().getTime() <= 7;

  const items = [
    {
      label: "View Profile",
      onClick: () => router.push(`/members/${id}/profile`),
    },
    ...(isRenewable
      ? [
          {
            label: "Renew Member",
            onClick: () => router.push(`/members/${id}/renew`),
          },
        ]
      : []),
    {
      label: "Edit Member",
      onClick: () => router.push(`/members/${id}/edit`),
    },
    ...(!member.lockerId
      ? [
          {
            label: "Assign Locker",
            onClick: () => router.push(`/members/${id}/assign-locker`),
          },
        ]
      : [
          {
            label: "Unassign Locker",
            onClick: () => onOpen("unassignLockerModal", { id: id }),
          },
        ]),
    {
      label: "Delete Member",
      onClick: () => onOpen("deleteMemberModal", { ids: [id] }),
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
