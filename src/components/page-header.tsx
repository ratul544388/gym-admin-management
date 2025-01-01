"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";

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
    <div className="flex items-center p-3 rounded-md border-b border-dashed bg-background mt-3">
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
    </div>
  );
};
