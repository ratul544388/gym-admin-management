"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryString } from "@/hooks/use-query-string";
import { capitalize, cn } from "@/lib/utils";
import { StatusType } from "@/types";
import { Check, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const StatusHeaderPopover = () => {
  const [open, setOpen] = useState(false);
  const { push } = useQueryString();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status")?.toUpperCase() as StatusType;
  const statusItems: StatusType[] = ["ACTIVE", "PENDING", "EXPIRED"];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-2">
        Status
        <ChevronDown
          className={cn("size-4 transition-all", open && "rotate-180")}
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-32 flex-col px-0 py-2">
        {statusItems.map((item) => (
          <Button
            onClick={() => {
              if (activeStatus === item) {
                push({ status: "" });
              } else {
                push({ status: item });
              }
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