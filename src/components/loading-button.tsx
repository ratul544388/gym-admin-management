"use client";

import React, { forwardRef } from "react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export const LoadingButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & { isLoading: boolean }
>(
  (
    { disabled, isLoading, variant = "default", size = "lg", ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={isLoading || disabled}
        className={cn(
          "relative overflow-hidden ml-auto font-semibold w-fit",
          props.className
        )}
      >
        {props.children}
        <span
          className={cn(
            "absolute items-center justify-center inset-0 hidden bg-primary",
            isLoading && "flex"
          )}
        >
          <Loader className="size-4 animate-spin" />
        </span>
      </Button>
    );
  }
);

LoadingButton.displayName = "Button";
