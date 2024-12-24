import React from "react";
import { RenewForm } from "../../_components/renew-form";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";

const RenewMemberPage = async ({ params }: { params: ParamsType }) => {
  const membershipPlans = await db.membershipPlan.findMany();
  const { id } = await params;
  
  const member = await db.member.findUnique({
    where: {
      id,
    },
    include: {
      membershipPlan: {
        include: {
          membershipRecords: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          }
        }
      }
    },
  });

  if (!member) return;
  return (
    <div>
      <RenewForm member={member} membershipPlans={membershipPlans} />
    </div>
  );
};

export default RenewMemberPage;
