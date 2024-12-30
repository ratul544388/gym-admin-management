"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Container } from "./container";
import { Logo } from "./logo";
import { MobileSidebar } from "./sidebars/mobile-sidebar";
import { ThemeToggler } from "./theme-toggler";
import { UserButton } from "./user-button";

export const Header = () => {
  const currentUser = useCurrentUser();
  return (
    <Container
      elem="header"
      className="sticky top-0 z-50 flex h-[65px] items-center border-b bg-background"
    >
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <Logo href={currentUser?.role === "ADMIN" ? "/dashboard" : "/"} />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <ThemeToggler />
        <UserButton />
      </div>
    </Container>
  );
};
