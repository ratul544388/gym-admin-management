import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import React from "react";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";
import { SearchParamsType } from "@/types";
import { Prisma } from "@prisma/client";
import { getSkip } from "@/lib/utils";
import { VIEW_PER_PAGE } from "@/constants";

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

  const [expenses, expensesCount] = await Promise.all([
    db.expense.findMany({
      where,
      take: VIEW_PER_PAGE,
      skip,
      orderBy: { createdAt: "desc" },
    }),
    db.expense.count({ where }),
  ]);

  return (
    <div className="space-y-3">
      <PageHeader label="Expenses" actionUrl="/expenses/new" />
      <DataTable
        columns={columns}
        data={expenses}
        dataCount={expensesCount}
        showSearchInput
        searchInputPlaceholder="Search by Title"
      />
    </div>
  );
};

export default ExpensesPage;
