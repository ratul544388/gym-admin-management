"use client";

import { cn } from "@/lib/utils";
import { DropdownMenuItemType } from "@/types";
import { Check, ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { Badge } from "./ui/badge";
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
  align = "center",
  showArrow,
  triggerClassName,
}: DropDownMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "flex items-center gap-3 whitespace-nowrap",
          triggerClassName,
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
            badge,
            disabled,
            onClick,
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
                destructive && "bg-red-500/10 hover:bg-red-500/20",
              )}
              variant="ghost"
            >
              {badge !== undefined && (
                <Badge className="flex size-4 items-center justify-center p-0 text-xs">
                  {badge}
                </Badge>
              )}
              {Icon && <Icon className="size-4" />}
              {label}
              {active && <Check className="size-4 text-muted-foreground" />}
            </Button>
          ),
        )}
      </PopoverContent>
    </Popover>
  );
};
