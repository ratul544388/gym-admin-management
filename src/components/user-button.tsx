"use client";

import { logout } from "@/actions/users";
import { cn } from "@/lib/utils";
import { CurrentUser, DropdownMenuItemType } from "@/types";
import { LogOut, User2, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import UserAvatar from "./user-avatar";
import { useState } from "react";

export const UserButton = ({ currentUser }: { currentUser: CurrentUser }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const items: DropdownMenuItemType[] = [
    ...(currentUser
      ? [
          {
            label: "Profile",
            icon: User2,
            onClick: () => {},
          },
          {
            label: "Logout",
            icon: LogOut,
            onClick: () => logout(),
          },
        ]
      : [
          {
            label: "Login",
            icon: User2,
            onClick: () => router.push("/login"),
          },
          {
            label: "Register",
            icon: UserRoundPlus,
            onClick: () => router.push("/register"),
          },
        ]),
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <UserAvatar src={currentUser?.image} alt={currentUser?.name} />
      </PopoverTrigger>
      <PopoverContent align="end" className={cn("flex flex-col px-0 py-2 w-fit")}>
        {currentUser && (
          <div className="mb-3 px-5 flex items-center gap-2">
            <UserAvatar
              src={currentUser?.image}
              alt={currentUser?.name}
              className="size-12"
            />
            <div className="flex flex-col text-sm">
              {currentUser?.email}
              <span>{currentUser?.name}</span>
            </div>
          </div>
        )}
        {currentUser && <Separator className="my-2"/>}
        {items.map(({ label, icon: Icon, onClick }) => (
          <Button
            variant="ghost"
            key={label}
            onClick={() => {
              onClick();
              setOpen(false);
            }}
            className="justify-start rounded-none"
          >
            {Icon && <Icon className="size-4" />}
            {label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
