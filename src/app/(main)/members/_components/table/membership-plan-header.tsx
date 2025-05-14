"use client";

import {
  getMembershipPlans
} from "@/app/(main)/membership-plans/actions";
import { DropDownMenu } from "@/components/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import { DropdownMenuItemType, StatusType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const MembershipPlanHeader = () => {
  const { setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const activeMembershipPlan = searchParams.get(
    "membership_plan"
  ) as StatusType;

  const { data: membershipPlans } = useQuery({
    queryKey: ["membership-plans"],
    queryFn: async () => await getMembershipPlans(),
  });

  const items: DropdownMenuItemType[] =
    membershipPlans?.map(({ name, _count }) => {
      return {
        label: name,
        active: activeMembershipPlan === name.toLowerCase(),
        onClick: () => {
          setQueryParams({
            query: { membership_plan: name.toLowerCase() },
            toggleIfSame: true,
          });
        },
        badge: {
          label: _count.members,
        },
      };
    }) || [];

  return (
    <DropDownMenu
      showArrow
      items={items}
      triggerClassName={cn(buttonVariants({ variant: "ghost" }))}
    >
      Membership Plan
    </DropDownMenu>
  );
};
