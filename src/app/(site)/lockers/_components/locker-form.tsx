"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createLocker, updateLocker } from "@/actions/lockers";
import { FormCard } from "@/components/form-card";
import { LoadingButton } from "@/components/loading-button";
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
import { Locker } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const LockerForm = ({ locker }: { locker?: Locker | null }) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormField
            control={form.control}
            name="lockerNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Locker No.</FormLabel>
                <FormControl>
                  <Input
                    autoFocus={!!!locker}
                    type="number"
                    placeholder="Enter Locker Number"
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={isPending}
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton isLoading={isPending} className="ml-auto">
            {locker ? "Update" : "Create"}
          </LoadingButton>
        </FormCard>
      </form>
    </Form>
  );
};
