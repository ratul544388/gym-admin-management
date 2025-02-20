import { PageHeader } from "@/components/page-header";
import React from "react";
import { AddmissionFeeForm } from "./addmission-fee-form";
import { db } from "@/lib/db";

const SettingsPage = async () => {
  const defaultValues = await db.default.findFirst();
  return (
    <div className="space-y-6">
      <PageHeader label="Settings" />
      <div className="rounded-md bg-background p-5">
        <AddmissionFeeForm admissionFee={defaultValues?.admissionFee} />
      </div>
    </div>
  );
};

export default SettingsPage;
