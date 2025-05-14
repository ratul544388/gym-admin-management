import { ExpenseForm } from "@/app/(main)/expenses/_components/expense-form";
import { PageHeader } from "@/components/page-header";
import React from "react";

const NewExpense = () => {
  return (
    <>
      <PageHeader label="Expenses" backButtonUrl="/expenses" />
      <ExpenseForm />
    </>
  );
};

export default NewExpense;
