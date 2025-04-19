"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";
import { DropdownMenuItemType } from "@/types";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

export const StartDateHeader = () => {
  const { setQueryParams } = useQueryParams();
  const items: DropdownMenuItemType[] = [
    {
      label: "Asc",
      onClick: () =>
        setQueryParams({
          query: { orderby: "asc", order_with: "start_date" },
          toggleIfSame: false,
        }),
      icon: ArrowUpNarrowWide,
    },
    {
      label: "Desc",
      onClick: () =>
        setQueryParams({
          query: { orderby: "desc", order_with: "start_date" },
          toggleIfSame: false,
        }),
      icon: ArrowDownNarrowWide,
    },
  ];
  return (
    <DropDownMenu
      items={items}
      showArrow
      triggerClassName={buttonVariants({ variant: "ghost" })}
    >
      Start Date
    </DropDownMenu>
  );
};
