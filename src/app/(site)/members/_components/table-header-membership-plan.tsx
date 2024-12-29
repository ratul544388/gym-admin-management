"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useQueryParams } from "@/hooks/use-query-params";
import { getMembershipPlanNames } from "@/actions/membership-plans";
import { DropdownMenuItemType, StatusType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const TableHeaderMembershipPlan = () => {
  const setQueryParams = useQueryParams();
  const searchParams = useSearchParams();
  const activeMembershipPlan = searchParams.get(
    "membership_plan",
  ) as StatusType;

  console.log(activeMembershipPlan);

  const { data: membershipPlans } = useQuery({
    queryKey: ["membership-plans"],
    queryFn: async () => await getMembershipPlanNames(),
  });


  const items: DropdownMenuItemType[] = membershipPlans?.map(
    ({ name }) => {
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
    },
  ) || [];

  return (
    <DropDownMenu showArrow items={items}>
      Membership Plan
    </DropDownMenu>
  );
};
