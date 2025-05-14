"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  type?: "text" | "number";
  disabled?: boolean;
  autoFocus?: boolean;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  disabled = false,
  autoFocus,
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                type={type}
                disabled={disabled}
                value={field.value || ""}
                onChange={field.onChange}
                autoFocus={autoFocus}
                className="peer h-[60px] pt-4"
              />
              <span
                className={cn(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none rounded-md capitalize text-muted-foreground transition-all peer-focus:top-3 peer-focus:text-sm peer-focus:text-primary",
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
