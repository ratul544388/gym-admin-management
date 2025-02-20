import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { columns } from "./_components/table/columns";
import { DataTable } from "@/components/data-table";
import { Suspense } from "react";

const MembershipPlansPage = async () => {
  const memebershipPlans = await db.membershipPlan.findMany();
  return (
    <div className="space-y-4">
      <PageHeader label="Membership Plans" actionUrl="/membership-plans/new" />
      <Suspense fallback="">
        <DataTable columns={columns} data={memebershipPlans} />
      </Suspense>
    </div>
  );
};

export default MembershipPlansPage;
