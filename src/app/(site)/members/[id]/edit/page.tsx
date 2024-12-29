import { db } from "@/lib/db";
import React from "react";
import { MemberForm } from "../../_components/member-form";
import { ParamsType } from "@/types";
import { PageHeader } from "@/components/page-header";

const EditMemberPage = async ({ params }: { params: ParamsType }) => {
  const id = (await params).id;
  const member = await db.member.findUnique({
    where: {
      id,
    },
  });

  const lockers = await db.locker.findMany();

  const membershipPlans = await db.membershipPlan.findMany();

  if (!member) return;

  return (
    <div className="space-y-3">
      <PageHeader label="Edit Member" showBackButton />
      <MemberForm
        member={member}
        membershipPlans={membershipPlans}
        lockers={lockers}
      />
    </div>
  );
};

export default EditMemberPage;
