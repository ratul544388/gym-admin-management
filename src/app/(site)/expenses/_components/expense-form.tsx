"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormCard } from "@/components/form-card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { expenseSchema } from "@/schemas";
import { createExpense, updateExpense } from "@/actions/expenses";
import { Expense } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const ExpenseForm = ({ expense }: { expense?: Expense }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: expense?.title || "",
      cost: expense?.cost || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof expenseSchema>) {
    startTransition(() => {
      if (expense) {
        updateExpense({ values, id: expense.id }).then(
          ({ error, success }) => {
            if (success) {
              toast.success(success);
              router.push("/expenses");
              router.refresh();
            } else {
              toast.error(error);
            }
          },
        );
      } else {
        createExpense(values).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            form.reset();
            router.push("/expenses");
            router.refresh();
          } else {
            toast.error(error);
          }
        });
      }
    });
  }

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
          <Button type="submit" disabled={isPending} className="ml-auto">
            {expense ? "Update" : "Create"}
          </Button>
        </FormCard>
      </form>
    </Form>
  );
};
