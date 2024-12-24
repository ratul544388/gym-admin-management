import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { columns } from "./columns";
import { DataTable } from "./data-table"

export const dynamic = "force-dynamic";

const MembershipPlansPage = async () => {
  const membershipPlans = await db.membershipPlan.findMany({
    include: {
      _count: {
        select: {
          members: true
        }
      }
    },
    orderBy: {
      price: 'asc'
    }
  });

  const formattedMembershipPlans = membershipPlans.map(({id, name, price, durationInMonth, _count}) => {
    return {
      id,
      name,
      durationInMonth,
      price,
      memberCount: _count.members
    }
  })

  return (
    <div className="">
      <PageHeader label="Membership Plan" actionUrl="/membership-plans/new" />
      <DataTable columns={columns} data={formattedMembershipPlans} />
    </div>
  );
};

export default MembershipPlansPage;
