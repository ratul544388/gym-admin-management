"use server";

import { db } from "@/lib/db";
import { isAdmin } from "@/lib/is-admin";
import { ExpenseSchema, ExpenseValues } from "@/validations";

export const createExpense = async (values: ExpenseValues) => {
  try {
    ExpenseSchema.parse(values);

    if (!(await isAdmin())) {
      return { error: "Unauthorized" };
    }

    await db.expense.create({
      data: values,
    });

    return { success: "Expense Created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateExpense = async ({
  values,
  id,
}: {
  values: ExpenseValues;
  id: string;
}) => {
  try {
    ExpenseSchema.parse(values);

    if (!(await isAdmin())) {
      return { error: "Unauthorized" };
    }

    await db.expense.update({
      where: {
        id,
      },
      data: values,
    });

    return { success: "Expense Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteExpenses = async (ids: string[]) => {
  try {
    if (!(await isAdmin())) {
      return { error: "Unauthorized" };
    }
    await db.expense.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const success = ids.length === 1 ? "Expense Deleted" : "Expenses Deleted";

    return { success };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
