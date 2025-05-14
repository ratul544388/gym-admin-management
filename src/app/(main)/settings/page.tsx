import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { AddmissionFeeForm } from "./addmission-fee-form";
import { Suspense } from "react";
import { PageLoader } from "@/components/loaders/page-loader";
import Await from "@/components/await";

export const generateMetadata = (): Metadata => {
  return {
    title: "Members",
  };
};

const SettingsPage = async () => {
  const promise = db.default.findFirst();
  return (
    <>
      <PageHeader label="Settings" />
      <Suspense fallback={<PageLoader />}>
        <div className="bg-secondary border rounded-xl p-5">
          <Await promise={promise}>
            {(data) => <AddmissionFeeForm admissionFee={data?.admissionFee} />}
          </Await>
        </div>
      </Suspense>
    </>
  );
};

export default SettingsPage;
