import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/dashboard" className={cn("block", className)}>
      <Image width={202 * 0.8} height={40 * 0.8} src="/logo.svg" alt="Logo" />
    </Link>
  );
};

export default Logo;
