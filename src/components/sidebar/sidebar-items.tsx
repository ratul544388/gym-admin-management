"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface SidebarItemsProps {
  className?: string;
  onClose?: () => void;
}

export const SidebarItems = ({ className, onClose }: SidebarItemsProps) => {
  const pathname = usePathname();
  return (
    <nav className={cn("mt-5", className)}>
      <ul>
        {sidebarLinks.map(({ label, image, href }) => {
          const isActive = pathname === href;
          return (
            <li key={label}>
              <Link
                onClick={onClose}
                href={href}
                className={cn(
                  "flex relative items-center gap-4 py-2.5 px-4 hover:bg-accent font-medium",
                  isActive &&
                    "bg-primary/10 hover:bg-primary/20 text-primary font-semibold"
                )}
              >
                <Image src={image} alt="Icon" width={20} height={20} />
                {label}
                {isActive && (
                  <motion.span
                    layoutId="activeSidebarLink"
                    className="absolute inset-y-0 w-2 bg-blue-600 left-0 rounded-r-full"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
