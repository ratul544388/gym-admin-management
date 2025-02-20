import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("block", className)}>
      <Image width={267 * 0.7} height={42 * 0.7} src="/logo.svg" alt="Logo" />
    </Link>
  );
};

export default Logo;
