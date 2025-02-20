import NotFound from "@/app/not-found";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import { isValidObjectId } from "mongoose";
import { MemberForm } from "../../_components/member-form";

const EditMemberPage = async ({ params }: { params: ParamsType }) => {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return <NotFound />;
  }

  const member = await db.member.findUnique({
    where: {
      id,
    },
  });

  const membershipPlans = await db.membershipPlan.findMany();

  if (!member) {
    return <NotFound />;
  }

  return (
    <div className="space-y-6">
      <PageHeader label="Edit Member" backButtonUrl="/members" />
      <MemberForm member={member} membershipPlans={membershipPlans} />
    </div>
  );
};

export default EditMemberPage;
