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
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    onChange(inputValue || 0);
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
            value={inputValue || ""}
            onChange={(e) => setInputValue(Number(e.target.value))}
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
