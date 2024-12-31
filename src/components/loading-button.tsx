import { forwardRef } from "react";
import { Button, ButtonProps } from "./ui/button";
import { Loader } from "./loader";
import { cn } from "@/lib/utils";

export const LoadingButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & { isLoading: boolean }
>(({ children, variant, isLoading, size, ...props }, ref) => {
  return (
    <Button
      disabled={isLoading}
      className="relative"
      variant={variant}
      size={size}
      {...props}
      ref={ref}
    >
      <Loader className={cn("abs-center hidden", isLoading && "block")} />
      <span className={cn(isLoading && "text-transparent")}>{children}</span>
    </Button>
  );
});

LoadingButton.displayName = "LoadingButton";
