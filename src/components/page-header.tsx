
"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

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
    <div className={cn("flex h-[60px] border bg-secondary my-4 rounded-xl px-4 items-center ", className)}>
      {backButtonUrl && (
        <Link
          href={backButtonUrl}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "rounded-full mr-2"
          )}
        >
          <ArrowLeft className="size-4" />
        </Link>
      )}
      <h1 className="font-semibold text-xl">{label}</h1>
      {actionUrl && (
        <Link href={actionUrl} className={cn(buttonVariants(), "ml-auto")}>
          <PlusCircle />
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

