"use client";

import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

interface ModifiedCostPopoverProps {
  title?: string;
  value?: number;
  onChange: (value: number) => void;
  children: ReactNode;
  align?: "start" | "end";
  className?: string;
}

export const ModifiedCostPopover = ({
  title = "Modified cost",
  value,
  onChange,
  children,
  align = "end",
  className,
}: ModifiedCostPopoverProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    onChange(value || 0);
    setOpen(false);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn("outline-none", className)}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-3" align={align}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h5>{title}</h5>
          <Input
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
          />
          <Button type="button" className="ml-auto">
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
