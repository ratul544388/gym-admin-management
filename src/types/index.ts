import { Locker, Member, MembershipPlan, Role } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export type SearchParamsType = Promise<{
  [key: string]: string | undefined;
}>;

export type ParamsType = Promise<{ [key: string]: string }>;

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
  disabled?: boolean;
  active?: boolean;
  onClick: () => void;
  destructive?: boolean;
  badge?: { label?: string | number; isPending?: boolean };
};

export type FullMembershipPlanType = MembershipPlan & {
  _count: {
    members: number;
  };
};

export type ExpenseVsRevenueChartType = {
  month: string;
  expenses: number;
  revenue: number;
}[];

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: Role;
  image: string | null;
};

export type ActionReturnedType = Promise<{ success?: string; error?: string }>;

export type Orderby = "asc" | "desc";
