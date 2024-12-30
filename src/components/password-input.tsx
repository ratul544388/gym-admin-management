"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [type, setType] = useState<"text" | "password">("password");
  const EyeIcon = type === "password" ? EyeOff : Eye;

  const handleEyeClick = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className={cn("relative", className)}>
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        )}
        ref={ref}
        {...props}
      />
      <EyeIcon
        onClick={handleEyeClick}
        className="absolute right-3 top-1/2 size-4 -translate-y-1/2 cursor-pointer"
      />
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
