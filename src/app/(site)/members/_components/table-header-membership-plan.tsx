"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useQueryString } from "@/hooks/use-query-string";
import { getMembershipPlans } from "@/server-actions/membership-plans";
import { DropdownMenuItemType, StatusType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const TableHeaderMembershipPlan = () => {
  const { push } = useQueryString();
  const searchParams = useSearchParams();
  const activeMembershipPlan = searchParams.get(
    "membership_plan",
  ) as StatusType;

  console.log(activeMembershipPlan);

  const { data: membershipPlans } = useQuery({
    queryKey: ["membership-plans"],
    queryFn: async () => await getMembershipPlans(),
  });

  if (!membershipPlans) return;

  const items: DropdownMenuItemType[] = membershipPlans?.map(
    ({ name, _count }) => {
      return {
        label: name,
        badge: _count.members,
        active: activeMembershipPlan === name.toLowerCase(),
        onClick: () => {
          if (activeMembershipPlan === name.toLowerCase()) {
            push({ membership_plan: "" });
          } else {
            push({ membership_plan: name });
          }
        },
      };
    },
  );

  return (
    <DropDownMenu showArrow items={items}>
      Membership Plan
    </DropDownMenu>
  );
};
