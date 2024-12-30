"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) => {
  return (
    <Link href={href} className={cn("block", className)}>
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={56} height={56} />
        <span
          className={cn(
            "font-rubik_vinyl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-lg font-bold text-transparent",
          )}
        >
          EFS
        </span>
      </div>
    </Link>
  );
};
