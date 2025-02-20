"use client";
import { UserButton } from "@clerk/nextjs";
import { Container } from "./container";
import Logo from "./logo";
import { MobileSidebar } from "./sidebar/mobile-sidebar";
import { ThemeToggler } from "./theme-toggler";

export const Header = () => {
  return (
    <header className="sticky z-50 bg-background top-0 h-[70px] border-b">
      <Container className="h-full gap-4 flex items-center">
        <MobileSidebar />
        <Logo className="" />
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggler />
          <UserButton />
        </div>
      </Container>
    </header>
  );
};
