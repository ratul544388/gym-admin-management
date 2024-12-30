import { PageHeader } from "@/components/page-header";
import React from "react";
import { AddmissionFeeForm } from "./_components/addmission-fee-form";
import { db } from "@/lib/db";

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
    </div>
  );
};

export default SettingsPage;
