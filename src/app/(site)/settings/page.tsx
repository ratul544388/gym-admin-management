import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { AddmissionFeeForm } from "./_components/addmission-fee-form";

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
