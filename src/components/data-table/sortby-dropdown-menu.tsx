"use client";

import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpWideNarrow,
} from "lucide-react";
import { DropDownMenu } from "../dropdown-menu";
import { buttonVariants } from "../ui/button";
import { DropdownMenuItemType, Orderby } from "@/types";
import { useQueryParams } from "@/hooks/use-query-params";
import { useSearchParams } from "next/navigation";

export const SortbyDropdownMenu = () => {
  const { setQueryParams } = useQueryParams();
  const orderby = useSearchParams().get("orderby") as Orderby;
  const items: DropdownMenuItemType[] = [
    {
      label: "Asc",
      icon: ArrowUpWideNarrow,
      onClick: () => setQueryParams({ query: { orderby: "asc" } }),
      active: orderby === "asc",
    },
    {
      label: "Desc",
      icon: ArrowDownWideNarrow,
      onClick: () => setQueryParams({ query: { orderby: "desc" } }),
      active: orderby === "desc",
    },
  ];

  return (
    <DropDownMenu
      items={items}
      triggerClassName={buttonVariants({
        variant: "outline",
        size: "icon",
        className: "min-w-9 rounded-md",
      })}
    >
      <ArrowUpDown className="size-4" />
    </DropDownMenu>
  );
};
