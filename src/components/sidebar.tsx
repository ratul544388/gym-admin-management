"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed top-[90px] z-20 hidden h-screen min-w-[64px] rounded-xl rounded-l-none dark:shadow-accent bg-background xs:block md:min-w-[260px]">
      <nav className={cn("mt-5")}>
        <ul>
          {sidebarLinks.map(({ label, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={cn(
                    "relative flex items-center justify-center gap-4 px-4 py-3.5 md:py-2.5 font-medium text-foreground/80 transition-colors hover:bg-accent md:justify-start",
                    isActive &&
                      "bg-accent font-semibold text-primary",
                  )}
                >
                  <Icon className="size-5 md:size-4"/>
                  <span className="hidden md:block">{label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeSidebarLink"
                      className="absolute inset-y-0 left-0 w-2 rounded-r-full bg-primary"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
