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
import { Button } from "../ui/button";
import { SidebarItems } from "./sidebar-items";
export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden" asChild>
        <Button size="icon" variant="outline">
          <Menu className="size-5"/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="md:hidden">
        <SheetHeader className="hidden">
          <SheetTitle>Are you absolutely sure?</SheetTitle>
        </SheetHeader>
        <SidebarItems onClose={handleClose}/>
      </SheetContent>
    </Sheet>
  );
};
