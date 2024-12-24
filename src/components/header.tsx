"use client";

import { Logo } from "./logo";
import { MobileSidebar } from "./sidebars/mobile-sidebar";

export const Header = () => {
  return (
    <header className="border-b px-4 py-3 md:hidden flex items-center gap-3">
      <MobileSidebar />
      <Logo />
    </header>
  );
};
