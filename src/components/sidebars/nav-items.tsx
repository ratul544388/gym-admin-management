"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemsProps {
  className?: string;
  onSidebarClose?: () => void;
}

export const NavItems = ({ className, onSidebarClose }: NavItemsProps) => {
  return (
    <nav className={cn('w-full', className)}>
      <ul>
        {navItems.map(({ label, icon: Icon, href }) => (
          <li key={label}>
            <Link
              onClick={onSidebarClose}
              href={href}
              className="flex items-center gap-2 px-6 py-2.5 hover:bg-accent"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
