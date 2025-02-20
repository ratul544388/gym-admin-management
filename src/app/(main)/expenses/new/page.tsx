import { ExpenseForm } from "@/app/(main)/expenses/_components/expense-form";
import { PageHeader } from "@/components/page-header";
import React from "react";

const NewExpense = () => {
  return (
    <div className="space-y-6">
      <PageHeader label="Expenses" backButtonUrl="/expenses" />
      <ExpenseForm />
    </div>
  );
};

export default NewExpense;
