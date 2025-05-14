import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { columns } from "./_components/table/columns";
import { ParamsType } from "@/types";
import Await from "@/components/await";
import { Suspense } from "react";
import { PageLoader } from "@/components/loaders/page-loader";

export const generateMetadata = (): Metadata => {
  return {
    title: "Membership Plans",
  };
};

const MembershipPlansPage = async ({
  searchParams,
}: {
  searchParams: ParamsType;
}) => {
  const { q } = await searchParams;
  const promise = db.membershipPlan.findMany({
    where: {
      ...(q
        ? {
            name: {
              contains: q,
              mode: "insensitive",
            },
          }
        : {}),
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
    orderBy: {
      price: "asc",
    },
  });

  return (
    <>
      <PageHeader label="Membership Plans" actionUrl="/membership-plans/new" />
      <Suspense fallback={<PageLoader />}>
        <Await promise={promise}>
          {(data) => (
            <DataTable
              columns={columns}
              data={data}
              searchInputPlaceholder="Search Membership plans..."
              showSearchInput
            />
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default MembershipPlansPage;
