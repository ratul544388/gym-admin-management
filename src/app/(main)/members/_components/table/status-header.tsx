"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryParams } from "@/hooks/use-query-params";
import { capitalize, cn } from "@/lib/utils";
import { StatusType } from "@/types";
import { Check, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const StatusHeader = () => {
  const [open, setOpen] = useState(false);
  const { setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status")?.toUpperCase() as StatusType;
  const statusItems: StatusType[] = ["ACTIVE", "PENDING", "EXPIRED"];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={buttonVariants({ variant: "ghost" })}>
        Status
        <ChevronDown
          className={cn("size-4 transition-all", open && "rotate-180")}
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-32 flex-col px-0 py-2">
        {statusItems.map((item) => (
          <Button
            onClick={() => {
              setQueryParams({
                query: { status: item.toLowerCase() },
                toggleIfSame: true,
              });
              setOpen(false);
            }}
            key={item}
            variant="ghost"
            className="justify-start gap-4"
          >
            {capitalize(item)}
            <Check
              className={cn("hidden size-4", activeStatus === item && "block")}
            />
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
