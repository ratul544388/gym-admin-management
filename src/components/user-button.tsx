"use client";

import { DropdownMenuItemType } from "@/types";
import { DropDownMenu } from "./dropdown-menu";
import { logout } from "@/actions/users";
import { useCurrentUser } from "@/hooks/use-current-user";
import UserAvatar from "./user-avatar";
import { LogOut, User2 } from "lucide-react";

export const UserButton = () => {
  const currentUser = useCurrentUser();
  const items: DropdownMenuItemType[] = [
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
  ];

  return (
    <DropDownMenu items={items} align="end">
      <UserAvatar avatarUrl={currentUser?.image} />
    </DropDownMenu>
  );
};
