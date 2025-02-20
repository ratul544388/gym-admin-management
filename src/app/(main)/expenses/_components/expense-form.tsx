"use client";

import { createExpense, updateExpense } from "@/actions/expenses";
import { useFormError } from "@/hooks/use-form-error";
import { ExpenseSchema, ExpenseValues } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Expense } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormCard } from "@/components/form-card";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/loading-button";

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
          id: expense.id
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
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    autoFocus={!!!expense}
                    placeholder="Enter the title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Exter the cost"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError/>
          <LoadingButton type="submit" isLoading={isPending} className="ml-auto">
            {expense ? "Update" : "Create"}
          </LoadingButton>
        </FormCard>
      </form>
    </Form>
  );
};
