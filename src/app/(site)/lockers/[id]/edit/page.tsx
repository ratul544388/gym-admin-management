import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import React from "react";
import { LockerForm } from "../../_components/locker-form";

const EditLockerPage = async ({ params }: { params: ParamsType }) => {
  const { id } = await params;
  const locker = await db.locker.findUnique({
    where: {
      id,
    },
  });
  return (
    <div className="space-y-3">
      <PageHeader label="Edit Locker" showBackButton />
      <LockerForm locker={locker} />
    </div>
  );
};

export default EditLockerPage;
