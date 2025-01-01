import { PageHeader } from "@/components/page-header";
import React from "react";
import { AddmissionFeeForm } from "./_components/addmission-fee-form";
import { db } from "@/lib/db";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const SettingsPage = async () => {
  const defaultValues = await db.default.findFirst({
    select: { admissionFee: true },
  });
  return (
    <div className="space-y-3">
      <PageHeader label="Settings" />
      <div className="rounded-md bg-background p-5">
        <AddmissionFeeForm admissionFee={defaultValues?.admissionFee} />
      </div>
      <Link
        href="/settings/users"
        className={buttonVariants({
          variant: "ghost",
          className:
            "w-full justify-between bg-background text-base font-normal",
        })}
      >
        Users
        <ChevronDown />
      </Link>
    </div>
  );
};

export default SettingsPage;
