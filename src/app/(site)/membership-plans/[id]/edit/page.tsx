import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import React from "react";
import { MembershipPlanForm } from "../../_components/membership-plan-form";

const EditMembershipPlanPage = async ({ params }: { params: ParamsType }) => {
  const { id } = await params;
  const membershipPlan = await db.membershipPlan.findUnique({
    where: {
      id,
    },
  });

  return (
    <div className="space-y-3">
      <PageHeader label="Edit Membership Plan" showBackButton />
      <MembershipPlanForm membershipPlan={membershipPlan} />
    </div>
  );
};

export default EditMembershipPlanPage;
