"use client";

import { cn } from "@/lib/utils";
import { CircleCheckBig, TriangleAlert } from "lucide-react";

interface FormMessageProps {
  type: "success" | "error";
  message: string;
  className?: string;
}

export const FormMessage = ({ type, message, className }: FormMessageProps) => {
  return (
    <div
      className={cn(
        "flex h-10 items-center justify-center gap-3",
        type === "success" ? "bg-green-500/10" : "bg-red-500/10",
        className,
      )}
    >
      {type === "error" ? (
        <TriangleAlert className="size-4" />
      ) : (
        <CircleCheckBig className="size-4" />
      )}
      {message}
    </div>
  );
};
