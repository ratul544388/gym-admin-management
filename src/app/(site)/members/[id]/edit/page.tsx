import { db } from "@/lib/db";
import React from "react";
import { MemberForm } from "../../_components/member-form";
import { ParamsType } from "@/types";

const EditMemberPage = async ({ params }: { params: ParamsType }) => {
  const id = (await params).id;
  const member = await db.member.findUnique({
    where: {
      id,
    },
    include: {
      membershipRecords: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      lockerRecords: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  const lockers = await db.locker.findMany();

  const membershipPlans = await db.membershipPlan.findMany();

  if (!member) return;

  return (
    <div>
      <MemberForm
        member={member}
        membershipPlans={membershipPlans}
        lockers={lockers}
      />
    </div>
  );
};

export default EditMemberPage;
