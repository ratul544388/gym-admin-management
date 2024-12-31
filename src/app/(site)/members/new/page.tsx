import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CreateMemberForm } from "../_components/create-member-form";

const AddNewMemberPage = async () => {
  const [defaultValues, membershipPlans, lockers] = await Promise.all([
    db.default.findFirst(),
    db.membershipPlan.findMany(),
    db.locker.findMany({
      where: {
        members: {
          none: {},
        },
      },
    }),
  ]);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!membershipPlans.length) {
    redirect("/membership-plans/new");
  }

  return (
    <div className="space-y-3">
      <PageHeader label="Add a new Member" showBackButton />
      <CreateMemberForm
        membershipPlans={membershipPlans}
        lockers={lockers}
        admissionFee={defaultValues?.admissionFee}
      />
    </div>
  );
};

export default AddNewMemberPage;
