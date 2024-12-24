"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { lockerSchema } from "@/schemas";
import { createLocker, updateLocker } from "@/server-actions/lockers";
import { Locker } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const LockerForm = ({ locker }: { locker?: Locker }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof lockerSchema>>({
    resolver: zodResolver(lockerSchema),
    defaultValues: {
      lockerNo: locker?.lockerNo || undefined,
      price: locker?.price || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof lockerSchema>) {
    startTransition(() => {
      if (locker) {
        updateLocker({ values, lockerId: locker.id }).then(
          ({ error, success }) => {
            if (success) {
              toast.success(success);
              router.push("/lockers");
              router.refresh();
            } else {
              toast.error(error);
            }
          },
        );
      } else {
        createLocker(values).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            form.reset();
            router.push("/lockers");
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 rounded-lg border border-dashed p-5 shadow-md"
      >
        <FormField
          control={form.control}
          name="lockerNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locker No.</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Locker Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Duration In Month"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="ml-auto">
          {locker ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};
