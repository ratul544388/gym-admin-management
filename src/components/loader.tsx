"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  className?: string;
  size?: number;
}

export const Loader = ({ className, size = 40 }: LoaderProps) => {
  return (
    <div className={cn('text-primary', className)}>
      <Loader2 className="animate-spin" size={size} />
    </div>
  );
};
