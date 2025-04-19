import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/dashboard" className={cn("block", className)}>
      <Image width={180} height={60} src="/logo.png" alt="Logo" />
    </Link>
  );
};

export default Logo;
