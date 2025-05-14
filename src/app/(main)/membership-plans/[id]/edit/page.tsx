import NotFound from "@/app/not-found";
import { MembershipPlanForm } from "@/app/(main)/membership-plans/_components/membership-plan-form";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import { isValidObjectId } from "mongoose";

const EditMembershipPlanPage = async ({ params }: { params: ParamsType }) => {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return NotFound();
  }

  const membershipPlan = await db.membershipPlan.findUnique({
    where: {
      id,
    },
  });

  if (!membershipPlan) {
    return NotFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        label="Edit Membership plan"
        backButtonUrl="/membership-plans"
      />
      <MembershipPlanForm membershipPlan={membershipPlan} />
    </div>
  );
};

export default EditMembershipPlanPage;
