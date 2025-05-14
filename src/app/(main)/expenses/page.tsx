import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { VIEW_PER_PAGE } from "@/constants";
import { db } from "@/lib/db";
import { getSkip } from "@/lib/utils";
import { SearchParamsType } from "@/types";
import { Prisma } from "@prisma/client";
import { columns } from "./_components/table/columns";
import { Metadata } from "next";
import { Suspense } from "react";
import { PageLoader } from "@/components/loaders/page-loader";
import Await from "@/components/await";

export const generateMetadata = (): Metadata => {
  return {
    title: "Expenses",
  };
};

const ExpensesPage = async ({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) => {
  const { page, q } = await searchParams;

  const skip = getSkip(page);

  const where: Prisma.ExpenseWhereInput = {
    ...(q ? { title: { contains: q } } : {}),
  };

  const promise = db.expense.findMany({
    where,
    take: VIEW_PER_PAGE,
    skip,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader label="Expenses" actionUrl="/expenses/new" />
      <Suspense fallback={<PageLoader />}>
        <Await promise={promise}>
          {(data) => <DataTable columns={columns} data={data} />}
        </Await>
      </Suspense>
    </>
  );
};

export default ExpensesPage;
