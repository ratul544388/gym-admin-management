"use client";

import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { searchMembersForLocker } from "@/actions/members";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import UserAvatar from "./user-avatar";
import { Loader } from "./loader";

interface ComboboxProps {
  memberId?: string;
  onChange: (memberId: string) => void;
  disabled?: boolean;
}

export const MemberCombobox = ({
  memberId,
  onChange,
  disabled,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const debouncedValue = useDebounce(memberSearchQuery, 350);

  const { data: members, isLoading } = useQuery({
    queryKey: ["memberSearchOnLockerForm", debouncedValue],
    queryFn: async () => await searchMembersForLocker(memberSearchQuery),
    enabled: !!memberSearchQuery || !!memberId,
  });

  const getFormattedOption = (memberId: string) => {
    const member = members?.find((member) => member.id === memberId);
    if (!member) return null;
    return (
      <span className="flex items-center gap-3">
        <UserAvatar src={member?.imageUrl} alt={member.name} className="size-8"/>
        <span className="ml-2">{member?.name}</span>
      </span>
    );
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (
      isOpen &&
      memberId &&
      !members?.find((member) => member.id === memberId)
    ) {
      onChange("");
    }
  };

  console.log(isLoading)

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={disabled || isLoading}
        >
          {memberId
            ? getFormattedOption(memberId) || "Select Member"
            : "Select Member"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1" align="start">
        <Command>
          <CommandInput
            onValueChange={setMemberSearchQuery}
            placeholder="Search by ID or Name"
          />
          {isLoading && <Loader size={28} className="mx-auto mt-3"/>}
          <CommandList>
            {!isLoading && <CommandEmpty>No results found.</CommandEmpty>}
            <CommandGroup>
              {members?.map((m) => {
                const fullValue = `${m.id}|${m.name}|${m.phone}`;
                return (
                  <CommandItem
                    key={m.id}
                    value={fullValue}
                    onSelect={(currentValue) => {
                      onChange(currentValue.split("|")[0]);
                      setValue(fullValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === fullValue ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {getFormattedOption(m.id)}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
