"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/dashboard" className={cn("ml-5 block", className)}>
      <Image src="/logo.svg" alt="logo" width={238 * 0.75} height={41 * 0.75} />
    </Link>
  );
};
