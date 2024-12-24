"use client"

import { Logo } from "./logo";
import { MobileSidebar } from "./sidebars/mobile-sidebar";

export const MobileHeader = () => {
  return (
     <header className="md:hidden">
        <Logo/>
        <MobileSidebar/>
     </header>
    );
}
