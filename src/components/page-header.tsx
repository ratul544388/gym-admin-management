"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  className?: string;
  label: string;
  actionLabel?: string;
  actionUrl?: string;
  backButtonUrl?: string;
}

export const PageHeader = ({
  className,
  actionLabel = "Add new",
  label,
  actionUrl,
  backButtonUrl,
}: PageHeaderProps) => {
  return (
    <div className={cn("flex py-3 items-center border-b", className)}>
      {backButtonUrl && (
        <Link
          href={backButtonUrl}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), 'rounded-full mr-2')}
        >
          <ArrowLeft className="size-4" />
        </Link>
      )}
      <h1 className="font-semibold text-xl">{label}</h1>
      {actionUrl && (
        <Link href={actionUrl} className={cn(buttonVariants(), "ml-auto")}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
