"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useQueryParams } from "@/hooks/use-query-params";
import { getMembershipPlanNames } from "@/actions/membership-plans";
import { DropdownMenuItemType, StatusType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const MembershipPlanHeader = () => {
  const { setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const activeMembershipPlan = searchParams.get(
    "membership_plan"
  ) as StatusType;


  const { data: membershipPlans } = useQuery({
    queryKey: ["membership-plans"],
    queryFn: async () => await getMembershipPlanNames(),
  });

  const items: DropdownMenuItemType[] =
    membershipPlans?.map(({ name }) => {
      return {
        label: name,
        active: activeMembershipPlan === name.toLowerCase(),
        onClick: () => {
          setQueryParams({
            query: { membership_plan: name.toLowerCase() },
            toggleIfSame: true,
          });
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
