import React from "react";
import { RenewForm } from "../../_components/renew-form";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import { PageHeader } from "@/components/page-header";

const RenewMemberPage = async ({ params }: { params: ParamsType }) => {
  const membershipPlans = await db.membershipPlan.findMany();
  const { id } = await params;
  
  const member = await db.member.findUnique({
    where: {
      id,
    }
  });

  if (!member) return;
  return (
    <div className="space-y-3">
      <PageHeader label="Renew Member" showBackButton/>
      <RenewForm member={member} membershipPlans={membershipPlans} />
    </div>
  );
};

export default RenewMemberPage;
