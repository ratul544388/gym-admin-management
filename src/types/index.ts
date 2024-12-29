import {
  Locker,
  Member,
  MembershipPlan,
} from "@prisma/client";
import { LucideIcon } from "lucide-react";

export type SearchParamsType = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type ParamsType = Promise<{ id: string }>;

// export type MemberWithMembershipRecords = Member & {
//   membershipRecords: MembershipRecord[];
// };

export type FullMemberType = Member & {
  membershipPlan: {
    name: string;
  };
};

export type FullLockerType = Locker & {
  members: Member[]
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
