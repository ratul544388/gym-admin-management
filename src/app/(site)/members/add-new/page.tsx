import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MemberForm } from "../_components/member-form";

const AddNewMemberPage = async () => {
  const membershipPlans = await db.membershipPlan.findMany();
  const lockers = await db.locker.findMany({
    where: {
      member: null
    },
  });

  if (!membershipPlans.length) {
    redirect("/membership-plans/new");
  }

  return (
    <div className="space-y-3">
      <PageHeader label="Add a new Member" showBackButton />
      <Separator />
      <MemberForm membershipPlans={membershipPlans} lockers={lockers} />
    </div>
  );
};

export default AddNewMemberPage;
