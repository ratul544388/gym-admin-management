"use client"

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({
    children,
    className
} : ContainerProps) => {
  return (
     <div className={cn('px-3 sm:px-4 md:px-6', className)}>
        {children}
     </div>
    );
}
