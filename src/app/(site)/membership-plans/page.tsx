import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { columns } from "./columns";

const MembershipPlansPage = async () => {
  const membershipPlans = await db.membershipPlan.findMany({
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  return (
    <div className="">
      <PageHeader label="Membership Plan" actionUrl="/membership-plans/new" />
      <DataTable columns={columns} data={membershipPlans} />
    </div>
  );
};

export default MembershipPlansPage;
