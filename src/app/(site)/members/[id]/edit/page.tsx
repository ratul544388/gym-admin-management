import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import { UpdateMemberForm } from "../../_components/update-member-form";
import { notFound } from "next/navigation";

const EditMemberPage = async ({ params }: { params: ParamsType }) => {
  const id = (await params).id;
  const member = await db.member.findUnique({
    where: {
      id,
    },
  });

  if (!member) {
    return notFound();
  }

  return (
    <div className="space-y-3">
      <PageHeader label="Edit Member" showBackButton />
      <UpdateMemberForm member={member} />
    </div>
  );
};

export default EditMemberPage;
