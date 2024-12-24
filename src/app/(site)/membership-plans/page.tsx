import { PageHeader } from "@/components/page-header";
import { getMembershipPlans } from "@/server-actions/membership-plans";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Suspense } from "react";
import { cookies } from "next/headers";

const MembershipPlansPage = async () => {
  cookies();
  const membershipPlans = await getMembershipPlans();

  const formattedMembershipPlans = membershipPlans.map(
    ({ id, name, price, durationInMonth, _count }) => {
      return {
        id,
        name,
        durationInMonth,
        price,
        memberCount: _count.members,
      };
    },
  );

  return (
    <div className="">
      <PageHeader label="Membership Plan" actionUrl="/membership-plans/new" />
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={formattedMembershipPlans} />
      </Suspense>
    </div>
  );
};

export default MembershipPlansPage;
