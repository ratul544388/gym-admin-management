import { MembershipPlanForm } from "@/app/(main)/membership-plans/_components/membership-plan-form";
import { PageHeader } from "@/components/page-header";
import React from "react";

const NewMembershipPlanPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        label="New Membership Plan"
        backButtonUrl="/membership-plans"
      />
      <MembershipPlanForm />
    </div>
  );
};

export default NewMembershipPlanPage;
