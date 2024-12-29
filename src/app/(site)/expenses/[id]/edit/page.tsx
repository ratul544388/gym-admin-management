import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import React from "react";
import { ExpenseForm } from "../../_components/expense-form";

const EditExpensePage = async ({ params }: { params: ParamsType }) => {
  const { id } = await params;

  const expense = await db.expense.findUnique({
    where: {
      id,
    },
  });

  if(!expense) return;

  return <div className="space-y-3">
    <PageHeader label="Edit Expense"/>
    <ExpenseForm expense={expense}/>
  </div>;
};

export default EditExpensePage;
