"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { capitalize, cn } from "@/lib/utils";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  options: (string | { label: string; value: string })[];
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  options,
}: FormSelectProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Select
                open={open}
                onOpenChange={setOpen}
                disabled={disabled}
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className={cn(
                    "peer h-[60px] pt-4 text-muted-foreground",
                    open && "ring-2 ring-primary ring-offset-1",
                    field.value && "text-foreground",
                  )}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((option) => {
                      const value =
                        typeof option === "string" ? option : option.value;
                      const label =
                        typeof option === "string" ? option : option.label;

                      return (
                        <SelectItem value={value} key={value}>
                          {capitalize(label)}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span
                className={cn(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none capitalize text-muted-foreground transition-all peer-focus:top-3 peer-focus:text-sm peer-focus:text-primary",
                  open && "top-3 text-sm text-primary",
                  field.value && "top-3 text-sm",
                )}
              >
                {label || field.name}
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
