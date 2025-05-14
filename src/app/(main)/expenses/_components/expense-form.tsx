"use client";

import { useFormError } from "@/hooks/use-form-error";
import { ExpenseSchema, ExpenseValues } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Expense } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormCard } from "@/components/form-card";
import { FormInput } from "@/components/form-input";
import { LoadingButton } from "@/components/loading-button";
import {
  Form
} from "@/components/ui/form";
import { createExpense, updateExpense } from "../actions";

interface ExpenseFormProps {
  expense?: Expense;
}

export const ExpenseForm = ({ expense }: ExpenseFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { FormError, setError } = useFormError();
  const router = useRouter();
  const form = useForm<ExpenseValues>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      title: expense?.title || "",
      cost: expense?.cost || undefined,
    },
  });

  const onSubmit = (values: ExpenseValues) => {
    startTransition(() => {
      if (expense) {
        updateExpense({
          values,
          id: expense.id,
        }).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            router.push("/expenses");
            router.refresh();
          } else {
            setError(error);
          }
        });
      } else {
        createExpense(values).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            router.push("/expenses");
            router.refresh();
          } else {
            setError(error);
          }
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormInput
            control={form.control}
            name="title"
            autoFocus
            disabled={isPending}
          />
          <FormInput
            control={form.control}
            name="cost"
            type="number"
            disabled={isPending}
          />
          <FormError />
          <LoadingButton
            type="submit"
            isLoading={isPending}
            className="ml-auto"
          >
            {expense ? "Update" : "Create"}
          </LoadingButton>
        </FormCard>
      </form>
    </Form>
  );
};
