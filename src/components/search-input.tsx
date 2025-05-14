"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
}

export const SearchInput = ({
  className,
  placeholder = "Search...",
}: SearchInputProps) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 400);

  useEffect(() => {
    if (isInitialRender) {
      return setIsInitialRender(false);
    }
    if (!debouncedValue && !searchParams.get("q")) return;
    setQueryParams({
      query: {
        q: debouncedValue ? debouncedValue : "",
        page: "",
        status: "",
        gender: "",
        membership_plan: "",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="relative w-full max-w-[450px] bg-background rounded-lg">
      <Input
        placeholder={placeholder}
        className={cn("w-full rounded-lg", className)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search Input"
      />
      {value && (
        <Button
          onClick={() => setValue("")}
          aria-label="Clear Search Input"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
};
