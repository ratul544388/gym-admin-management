export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/page-header";
import { Metadata } from "next";
import { Suspense } from "react";
import { DashboardElements } from "./_components/dashboard-elements";
import { DashboardElementsSkeleton } from "./_components/dashboard-elements-skeleton";

export const generateMetadata = (): Metadata => {
  return {
    title: "Dashbaord",
  };
};

const DashboardPage = async () => {
  return (
    <>
      <PageHeader label="Dashboard" />
      <Suspense fallback={<DashboardElementsSkeleton />}>
        <DashboardElements />
      </Suspense>
    </>
  );
};

export default DashboardPage;
