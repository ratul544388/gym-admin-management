"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Container } from "./container";
import Logo from "./logo";
import { MobileSidebar } from "./sidebar/mobile-sidebar";
import { ThemeToggler } from "./theme-toggler";
import { Skeleton } from "./ui/skeleton";

export const Header = () => {
  const { isLoaded } = useUser();
  return (
    <header className="sticky z-50 bg-background top-0 h-[70px] border-b">
      <Container className="h-full gap-4 flex items-center">
        <MobileSidebar />
        <Logo className="" />
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggler />
          {isLoaded ? <UserButton /> : <Skeleton className="size-[28px] rounded-full"/>}
        </div>
      </Container>
    </header>
  );
};
