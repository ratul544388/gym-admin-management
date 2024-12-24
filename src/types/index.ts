import {
  Locker,
  LockerRecord,
  Member,
  MembershipPlan,
  MembershipRecord,
} from "@prisma/client";
import { LucideIcon } from "lucide-react";

export type SearchParamsType = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type ParamsType = Promise<{ id: string }>;

export type MemberWithMembershipRecords = Member & {
  membershipRecords: MembershipRecord[];
};

export type FullMemberType = Member & {
  membershipPlan: MembershipPlan & {
    membershipRecords: MembershipRecord[];
  };
  locker:
    | (Locker & {
        lockerRecords: LockerRecord[];
      })
    | null;
};

export type FullMembershipPlanType = {
  id: string;
  name: string;
  durationInMonth: number;
  price: number;
  memberCount: number;
};

export type FullLockerType = Locker & {
  lockerRecords: LockerRecord[];
  member: Member | null;
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

export type membershipPlanWithMemberCount = MembershipPlan & {
  _count: {
    members: number;
  };
};
