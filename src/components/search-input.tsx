"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";

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
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 400);

  useEffect(() => {
    console.log("Trigger......1");
    if (isInitialRender) {
      return setIsInitialRender(false);
    }
    console.log("Trigger......2");
    setQueryParams({ query: { q: debouncedValue ? debouncedValue : "" } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="relative w-full max-w-[450px]">
      <Input
        placeholder={placeholder}
        className={cn("w-full", className)}
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
