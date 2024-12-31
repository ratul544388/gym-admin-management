"use client";

import { logout } from "@/actions/users";
import { CurrentUser, DropdownMenuItemType } from "@/types";
import { LogOut, User2, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropDownMenu } from "./dropdown-menu";
import UserAvatar from "./user-avatar";

export const UserButton = ({currentUser} : {currentUser: CurrentUser}) => {
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
