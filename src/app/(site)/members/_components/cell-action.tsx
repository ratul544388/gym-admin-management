"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useModalStore } from "@/hooks/use-modal-store";
import { FullMemberType } from "@/types";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  member: FullMemberType;
}

export const CellAction = ({ member }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { onOpen } = useModalStore();

  const menuItems = [
    {
      label: "View Profile",
      onClick: () => router.push(`/members/${member.id}/profile`),
    },
    {
      label: "Renew Member",
      onClick: () => router.push(`/members/${member.id}/renew`),
    },
    {
      label: "Edit Member",
      onClick: () => router.push(`/members/${member.id}/edit`),
    },
    {
      label: "Delete Member",
      onClick: () => onOpen("deleteMemberModal", { ids: [member.id] }),
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-36 flex-col px-0 py-2" align="end">
        {menuItems.map(({ label, onClick }) => (
          <Button
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            key={label}
            variant="ghost"
            className="justify-start"
          >
            {label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
