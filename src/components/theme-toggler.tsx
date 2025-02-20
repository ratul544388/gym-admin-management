"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const themes = ["light", "dark", "system"];


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-md">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-32 flex-col px-0 py-1">
        {themes.map((t) => (
          <Button
            key={t}
            onClick={() => {
              setTheme(t);
              setOpen(false);
            }}
            variant="ghost"
            className="justify-start rounded-none capitalize"
          >
            <Check
              className={cn(
                "size-4 text-transparent",
                t === theme && "text-[initial]",
              )}
            />
            {t}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
