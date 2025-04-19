"use client";

import { capitalize, cn } from "@/lib/utils";
import { DropdownMenuItemType } from "@/types";
import { Check, ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DropDownMenuProps {
  items: DropdownMenuItemType[];
  children?: ReactNode;
  align?: "center" | "start" | "end";
  showArrow?: boolean;
  triggerClassName?: string;
}

export const DropDownMenu = ({
  items,
  children,
  align = "end",
  showArrow,
  triggerClassName,
}: DropDownMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "flex items-center gap-3 whitespace-nowrap hover:bg-accent",
          triggerClassName
        )}
      >
        {children}
        {showArrow && (
          <ChevronDown
            className={cn("size-4 transition-all", open && "rotate-180")}
          />
        )}
      </PopoverTrigger>
      <PopoverContent align={align} className="flex w-full flex-col px-0 py-2">
        {items.map(
          ({
            label,
            destructive,
            icon: Icon,
            active,
            disabled,
            onClick,
            badge,
          }) => (
            <Button
              onClick={() => {
                onClick();
                setOpen(false);
              }}
              disabled={disabled}
              key={label}
              className={cn(
                "justify-start rounded-none pr-8",
                destructive && "text-red-500 hover:text-red-600"
              )}
              variant="ghost"
            >
              {badge && (
                <span
                  className={cn(
                    "size-5 rounded-full flex items-center justify-center text-xs font-medium bg-accent",
                    badge.isPending && "animate-pulse"
                  )}
                >
                  {badge.label}
                </span>
              )}
              {Icon && <Icon className="size-4" />}
              {capitalize(label)}
              {active && <Check className="size-4 text-muted-foreground" />}
            </Button>
          )
        )}
      </PopoverContent>
    </Popover>
  );
};
