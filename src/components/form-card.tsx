"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormWrapperProps {
  children?: ReactNode;
  className?: string;
}

export const FormCard = ({ children, className }: FormWrapperProps) => {
  return (
    <div
      className={cn(
        "flex flex-col bg-background gap-8 rounded-lg border border-dashed p-6 shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
};
