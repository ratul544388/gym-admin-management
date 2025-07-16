"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export type SelectOptions = (string | { label: string; value: string })[];
export type SelectValue = string | string[];

interface TestSelectProps {
  options: SelectOptions;
  placeholder?: string;
  disabled?: boolean;
  value?: SelectValue;
  onChange: (value?: SelectValue) => void;
  deselect?: boolean;
  className?: string;
}

export const TestSelect = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  deselect,
}: TestSelectProps) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;
  useOnClickOutside(containerRef, () => setOpen(false));

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleSelect = (selectedValue: string) => {
    // Single-select mode
    if (!Array.isArray(value)) {
      const newValue = !deselect
        ? selectedValue
        : value === selectedValue
          ? undefined
          : selectedValue;
      onChange(newValue);
      setOpen(false);
      return;
    }

    // Multi-select mode
    const isSelected = value.includes(selectedValue);
    const updatedValue = isSelected
      ? value.filter((v) => v !== selectedValue)
      : [...value, selectedValue];
    focusInput();
    onChange(updatedValue);
  };

  const handleOpen = () => {
    if (open) {
      return setOpen(false);
    }
    focusInput();
  };

  const hasValue =
    typeof value === "string" || (Array.isArray(value) && value.length !== 0);

  const showInput = Array.isArray(value);

  return (
    <div
      onClick={handleOpen}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "relative h-auto min-h-9 py-1 w-full bg-accent/20 hover:bg-accent/40",
        className,
      )}
    >
      <div className="w-full flex flex-wrap gap-2">
        <SelectedValues value={value} onChange={onChange} deselect={deselect} />
        <input
          ref={inputRef}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          className={cn(
            "bg-transparent outline-none",
            !showInput && "caret-transparent",
            hasValue && "w-2 placeholder:text-transparent",
          )}
        />
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-full translate-y-2 scale-95 pt-1 opacity-0 transition-all ease-in",
          open && "pointer-events-auto translate-y-0 scale-100 opacity-100",
        )}
      >
        <div className="flex flex-col rounded-md bg-secondary">
          {options.map((opt) => {
            const selectLabel = typeof opt === "string" ? opt : opt.label;
            const selectValue = typeof opt === "string" ? opt : opt.value;
            return (
              <Button
                onClick={() => {
                  handleSelect(selectValue);
                }}
                variant="ghost"
                className="justify-start hover:bg-accent/40"
                key={selectLabel}
              >
                {selectLabel}
                {value?.includes(selectValue) && (
                  <Check className="ml-auto size-4" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SelectedValues = ({
  deselect,
  value,
  onChange,
}: {
  deselect?: boolean;
  value?: SelectValue;
  onChange: (value?: SelectValue) => void;
}) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  const handleDeselect = (selectedValue?: string) => {
    if (!selectedValue) {
      return onChange(undefined);
    }

    if (Array.isArray(value)) {
      onChange(value.filter((v) => v !== selectedValue));
    }
  };

  return !Array.isArray(value) ? (
    <span>
      {value}
      {deselect && (
        <span
          onClick={() => handleDeselect()}
          role="button"
          className="pointer-events-auto absolute right-1 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="size-4" />
        </span>
      )}
    </span>
  ) : (
    <>
      {value.map((v) => (
        <li
          key={v}
          className="flex text-xs items-center gap-1 rounded-full border bg-accent/60  pl-2 pr-1"
        >
          {v}
          <span
            onClick={() => handleDeselect(v)}
            role="button"
            className="pointer-events-auto rounded-full p-1 hover:bg-accent"
          >
            <X className="size-2.5" />
          </span>
        </li>
      ))}
    </>
  );
};
