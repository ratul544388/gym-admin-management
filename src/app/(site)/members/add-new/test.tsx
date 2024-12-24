import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MemberForm } from "../_components/member-form";

const Test = async () => {
    const membershipPlans = await db.membershipPlan.findMany();
    const lockers = await db.locker.findMany({
      where: {
        member: null,
      },
    });
  
    if (!membershipPlans.length) {
      redirect("/membership-plans/new");
    }
  return (
    <div>
      <MemberForm membershipPlans={membershipPlans} lockers={lockers} />
    </div>
  )
}

export default Test
