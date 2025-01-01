"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { today } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";
import { FullMemberType } from "@/types";
import { differenceInDays } from "date-fns";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface CellActionProps {
  member: FullMemberType;
}

export const CellAction = ({ member }: CellActionProps) => {
  const router = useRouter();
  const { onOpen } = useModalStore();

  const { membershipPlanEndDate, id, lockerEndDate, lockerId } = member;

  const isMembershipPlanRenewable =
    differenceInDays(membershipPlanEndDate, today) <= 7;
  const isLockerRenewable =
    !!lockerEndDate && differenceInDays(lockerEndDate, today) <= 7;

  const items = [
    {
      label: "View Profile",
      onClick: () => router.push(`/members/${id}/profile`),
    },
    ...(isMembershipPlanRenewable
      ? [
          {
            label: "Renew Membership Plan",
            onClick: () => router.push(`/members/${id}/renew`),
          },
        ]
      : []),
    ...(isLockerRenewable
      ? [
          {
            label: "Renew Locker",
            onClick: () => router.push(`/lockers/${lockerId}/renew/${id}`),
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
