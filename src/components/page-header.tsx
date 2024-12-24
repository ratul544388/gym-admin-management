"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  showBackButton?: boolean;
  label: string;
  actionLabel?: string;
  actionUrl?: string;
}

export const PageHeader = ({
  actionUrl,
  label,
  actionLabel = "Add new",
  showBackButton,
}: PageHeaderProps) => {
  const router = useRouter();
  return (
    <header className="flex items-center py-3 border-b border-dashed">
      {showBackButton && (
        <Button
          onClick={() => router.back()}
          className="mr-3 rounded-full"
          size="icon"
          variant="ghost"
        >
          <ArrowLeft className="size-5" />
        </Button>
      )}
      <h2 className="text-xl font-semibold">{label}</h2>
      {actionUrl && (
        <Link
          href={actionUrl}
          className={buttonVariants({ className: "ml-auto" })}
        >
          {actionLabel}
        </Link>
      )}
    </header>
  );
};
