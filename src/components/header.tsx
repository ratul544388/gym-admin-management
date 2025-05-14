"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Container } from "./container";
import Logo from "./logo";
import { MobileSidebar } from "./sidebar/mobile-sidebar";
import { ThemeToggler } from "./theme-toggler";
import { Skeleton } from "./ui/skeleton";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export const Header = () => {
  const { isLoaded } = useUser();
  const { theme, systemTheme } = useTheme();
  const clerkBaseTheme =
    theme === "dark" || (theme === "system" && systemTheme === "dark")
      ? dark
      : undefined;
  return (
    <Container
      elem="header"
      className="sticky top-0 z-50 flex h-[75px] max-w-full items-center gap-4 border-b bg-secondary"
    >
      <MobileSidebar />
      <Logo className="" />
      <div className="ml-auto flex items-center gap-3">
        <ThemeToggler />
        {isLoaded ? (
          <UserButton appearance={{ baseTheme: clerkBaseTheme }} />
        ) : (
          <Skeleton className="size-[28px] rounded-full" />
        )}
      </div>
    </Container>
  );
};
