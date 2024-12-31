"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CurrentUser } from "@/types";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import { NavItems } from "./nav-items";
export const MobileSidebar = ({currentUser} : {currentUser: CurrentUser}) => {
  const [open, setOpen] = useState(false);

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
