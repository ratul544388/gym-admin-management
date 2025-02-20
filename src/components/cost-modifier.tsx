"use client";

import { cn, formatPrice } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface CostModifierProps {
  title?: string;
  value: number;
  onChange: (value: number) => void;
  align?: "start" | "end";
  className?: string;
}

export const CostModifier = ({
  title = "Modify Paying Amount",
  value,
  onChange,
  align = "end",
  className,
}: CostModifierProps) => {
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
      <PopoverTrigger
        className={cn("outline-none font-semibold ml-auto", className)}
      >
        Paying Amount:{" "}
        <span className="text-blue-500">{formatPrice(value)}</span>
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
