import { MemberForm } from "@/app/(main)/members/_components/member-form";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import React from "react";

const NewMemberPage = async () => {
  const membershipPlans = await db.membershipPlan.findMany();
  return (
    <div className="space-y-6">
      <PageHeader label="New Member" backButtonUrl="/members" />
      <MemberForm admissionFee={500} membershipPlans={membershipPlans} />
    </div>
  );
};

export default NewMemberPage;
