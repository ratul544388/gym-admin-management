"use client";

import { changeRole } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { capitalize, cn } from "@/lib/utils";
import { UserType } from "@/types";
import { Role } from "@prisma/client";
import { Check, MoreVertical, ShieldAlert, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface CellActionProps {
  user: UserType;
}

export const CellAction = ({ user }: CellActionProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentUser = useCurrentUser();

  const handleRoleChange = (role: Role) => {
    if (role === user.role) return;
    startTransition(() => {
      changeRole({ id: user.id, role }).then(({ error, success }) => {
        if (success) {
          toast.success(success);
          router.refresh();
        } else {
          toast.error(error);
        }
      });
    });
  };

  const RoleIcon = user.role === "ADMIN" ? ShieldAlert : User2;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <RoleIcon className="size-4" />
            {capitalize(user.role)}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {Object.values(Role).map((role) => (
                <DropdownMenuItem
                  disabled={isPending || user.id === currentUser?.id}
                  onClick={() => handleRoleChange(role)}
                  key={role}
                >
                  <Check
                    className={cn(
                      "size-4 text-transparent",
                      user.role === role && "text-[initial]",
                    )}
                  />
                  {capitalize(role)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
