"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface LockerDurationAdjusterProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const LockerDurationAdjuster = ({
  value,
  onChange,
  className,
}: LockerDurationAdjusterProps) => {
  const handleClick = (num: number) => {
    onChange(value + num);
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        type="button"
        onClick={() => handleClick(-1)}
        className="rounded-full"
        size="icon"
        variant="outline"
        disabled={value === 1}
      >
        <Minus className="size-4" />
      </Button>
      {value}
      <Button
        type="button"
        onClick={() => handleClick(1)}
        className="rounded-full"
        size="icon"
        variant="outline"
        disabled={value === 12}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
