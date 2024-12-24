"use client";

import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/dashboard" className="block ml-5">
        <Image src="/logo.svg" alt="logo" width={238 * 0.75} height={41 * 0.75}/>
    </Link>
  );
};
