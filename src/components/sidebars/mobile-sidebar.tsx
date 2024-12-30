"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import { NavItems } from "./nav-items";
import { useCurrentUser } from "@/hooks/use-current-user";
export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useCurrentUser();

  if (!currentUser) return null;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden" asChild>
        <Button size="icon" variant="outline">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-0 py-4 md:hidden">
        <SheetHeader className="hidden">
          <SheetTitle>Are you absolutely sure?</SheetTitle>
        </SheetHeader>
        <Logo
          className="ml-5"
          href={currentUser.role === "ADMIN" ? "/dashboard" : "/"}
        />
        <NavItems onSidebarClose={handleClose} className="mt-6" />
      </SheetContent>
    </Sheet>
  );
};
