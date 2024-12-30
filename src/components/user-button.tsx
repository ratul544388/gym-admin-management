"use client";

import { DropdownMenuItemType } from "@/types";
import { DropDownMenu } from "./dropdown-menu";
import { logout } from "@/actions/users";
import { useCurrentUser } from "@/hooks/use-current-user";
import UserAvatar from "./user-avatar";
import { LogOut, User2, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const currentUser = useCurrentUser();
  const router = useRouter();
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
    <DropDownMenu items={items} align="end">
      <UserAvatar avatarUrl={currentUser?.image} />
    </DropDownMenu>
  );
};
