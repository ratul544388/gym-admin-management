import { AssignLockerForm } from "@/components/assign-locker-form";
import { PageHeader } from "@/components/page-header";
// import { db } from "@/lib/db";
import { ParamsType } from "@/types";

const AsignLockerToMemberPage = async ({ params }: { params: ParamsType }) => {
  const { id } = await params;
  
  return (
    <div>
      <PageHeader label="Asign Locker to Member" showBackButton />
      <AssignLockerForm memberId={id} />
    </div>
  );
};

export default AsignLockerToMemberPage;
