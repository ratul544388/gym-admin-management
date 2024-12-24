import React from "react";
import { MembershipPlanForm } from "../../_components/membership-plan-form";
import { db } from "@/lib/db";

const Page = async ({ params }: { params: Promise<{ membership_plan_id: string }> }) => {
  const membershipPlan = await db.membershipPlan.findUnique({
    where: {
      id: (await params).membership_plan_id,
    },
  });

  if (!membershipPlan) {
    return null;
  }

  return (
    <div>
      <MembershipPlanForm membershipPlan={membershipPlan} />
    </div>
  );
};

export default Page;
