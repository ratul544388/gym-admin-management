import { PageHeader } from "@/components/page-header";
import { ParamsType } from "@/types";
import { RenewLockerForm } from "../../../_components/renew-locker-form";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

const RenewLockerPage = async ({ params }: { params: ParamsType }) => {
  const { id, memberId } = await params;

  const locker = await db.locker.findUnique({
    where: { id },
  });

  const member = await db.member.findUnique({
    where: {
      id: memberId,
    },
    select: {
      id: true,
      name: true,
      lockerEndDate: true,
      imageUrl: true,
    },
  });

  if (!locker || !member?.lockerEndDate) {
    notFound();
  }

  console.log(member.lockerEndDate)

  return (
    <div className="space-y-3">
      <PageHeader label="Renew locker" showBackButton />
      <RenewLockerForm
        locker={locker}
        member={{ ...member, lockerEndDate: member.lockerEndDate as Date }}
      />
    </div>
  );
};

export default RenewLockerPage;
