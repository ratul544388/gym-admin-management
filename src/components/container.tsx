"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  elem?: "div" | "section" | "header" | "main";
}

export const Container = ({
  children,
  className,
  elem: Elem = "div",
}: ContainerProps) => {
  return (
    <Elem className={cn("px-3 sm:px-4 md:px-6", className)}>{children}</Elem>
  );
};
