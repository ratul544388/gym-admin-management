"use client";

import { cn } from "@/lib/utils";

export const NotProvided = ({ className }: { className?: string }) => {
  return <p className={cn("text-muted-foreground", className)}>_</p>;
};
