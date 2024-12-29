import { AssignLockerForm } from "@/components/assign-locker-form";
import { PageHeader } from "@/components/page-header";
import { ParamsType } from "@/types";

const AssignMemberToLockerPage = async ({ params }: { params: ParamsType }) => {
  const { id } = await params;

  return <div className="space-y-3">
    <PageHeader label="Assign Member" />
    <AssignLockerForm lockerId={id}/>
  </div>;
};

export default AssignMemberToLockerPage;
