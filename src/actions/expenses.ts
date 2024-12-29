"use server";

import { db } from "@/lib/db";
import { expenseSchema } from "@/schemas";
import * as z from "zod";

export const createExpense = async (values: z.infer<typeof expenseSchema>) => {
  console.log(values);
  try {
    const validatedFields = expenseSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    await db.expense.create({
      data: values,
    });

    return { success: "Locker Created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateExpense = async ({
  values,
  id,
} : {
  values: z.infer<typeof expenseSchema>,
  id: string;
}) => {
  console.log(values);
  try {
    const validatedFields = expenseSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    await db.expense.update({
      where: {
        id,
      },
      data: values,
    });

    return { success: "Locker Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
