"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";
import { DropdownMenuItemType, StatusType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getMembershipStatusCounts } from "../../actions";

export const StatusHeader = () => {
  const { data, isPending } = useQuery({
    queryKey: ["membershipStatusCounts"],
    queryFn: async () => await getMembershipStatusCounts(),
  });

  const { setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status")?.toUpperCase() as StatusType;

  const statusItems: { status: StatusType; count?: number }[] = [
    {
      status: "ACTIVE",
      count: data?.activeCount,
    },
    {
      status: "PENDING",
      count: data?.pendingCount,
    },
    {
      status: "EXPIRED",
      count: data?.expiredCount,
    },
  ];

  const menuItems: DropdownMenuItemType[] = statusItems.map(
    ({ status, count }) => {
      return {
        label: status,
        onClick: () =>
          setQueryParams({ query: { status: status.toLowerCase() } }),
        badge: {
          label: count,
          isPending: isPending,
        },
        active: status === activeStatus,
      };
    }
  );

  return (
    <DropDownMenu
      align="center"
      items={menuItems}
      triggerClassName={buttonVariants({ variant: "ghost" })}
      showArrow
    >
      Status
    </DropDownMenu>
  );
};
