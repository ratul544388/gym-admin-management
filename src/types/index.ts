import { Locker, Member, MembershipPlan, Role } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export type SearchParamsType = Promise<{
  [key: string]: string;
}>;

export type ParamsType = Promise<{ id: string }>;

export type CurrentUser = {
  name?: string | null;
  email?: string | null;
  role?: Role;
  image?: string | null;
} | null;

export type FullMemberType = Member & {
  membershipPlan: {
    name: string;
  };
};

export type FullLockerType = Locker & {
  members: Member[];
};

export type StatusType = "ACTIVE" | "PENDING" | "EXPIRED" | "AVAILABLE";

export type DropdownMenuItemType = {
  label: string;
  icon?: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
  active?: boolean;
  onClick: () => void;
  destructive?: boolean;
};

export type FullMembershipPlanType = MembershipPlan & {
  _count: {
    members: number;
  };
};
