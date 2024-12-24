import { PageHeader } from "@/components/page-header";
// import { db } from "@/lib/db";
import { ParamsType } from "@/types";

const AsignLockerToMemberPage = async ({  }: { params: ParamsType }) => {
  // const { id: memberId } = await params;
  // const lockers = await db.locker.findMany({
  //   include: {
  //     member: true,
  //     lockerRecords: {
  //       take: 1,
  //       orderBy: {
  //         createdAt: "desc",
  //       },
  //     },
  //   },
  // });
  return (
    <div>
      <PageHeader label="Asign Locker to Member" showBackButton />
    </div>
  );
};

export default AsignLockerToMemberPage;
