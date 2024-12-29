"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface OrSeparatorProps {
  className?: string;
}

export const OrSeparator = ({ className }: OrSeparatorProps) => {
  return (
    <span className={cn("relative w-full", className)}>
      <Separator />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3">
        or
      </span>
    </span>
  );
};
