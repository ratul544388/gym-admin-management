import React from "react";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import { PageHeader } from "@/components/page-header";
import { RenewForm } from "../renew-form";
import NotFound from "@/app/not-found";
import { isValidObjectId } from "mongoose";

const RenewMemberPage = async ({ params }: { params: ParamsType }) => {
  const membershipPlans = await db.membershipPlan.findMany();
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return <NotFound />;
  }

  const member = await db.member.findUnique({
    where: {
      id,
    },
  });

  if (!member) {
    return <NotFound />;
  }
  return (
    <div className="space-y-4">
      <PageHeader label="Renew Member" backButtonUrl="/members" />
      <RenewForm member={member} membershipPlans={membershipPlans} />
    </div>
  );
};

export default RenewMemberPage;
