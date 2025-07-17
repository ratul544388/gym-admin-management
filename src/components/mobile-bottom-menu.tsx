"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileBottomMenu = () => {
  const pathname = usePathname();

  const sortedSidebarLinks = [...sidebarLinks].sort((a, b) => a.order - b.order);

  return (
    <nav className="fixed inset-x-0 bottom-0 dark:shadow-accent-md [box-shadow:0px_-5px_10px_rgba(0,0,0,0.1)] xs:hidden">
      <ul className="flex items-center justify-between bg-background">
        {sortedSidebarLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-5 text-muted-foreground xs:hover:bg-accent active:accent",
                isActive && "text-primary",
              )}
            >
              <Icon className="relative z-10 size-4" />
              <p className="text-xs">
                {label.replace("Membership Plans", "Plans")}
              </p>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
