"use client";

import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
};

export const LoadingButton = ({ isLoading, ...props }: LoadingButtonProps) => {
  return (
    <Button disabled={isLoading} className={cn("relative", props.className)}>
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
};
