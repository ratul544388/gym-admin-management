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
import { membershipPlanSchema } from "@/schemas";
import {
  createMembershipPlan,
  updateMembershipPlan,
} from "@/server-actions/membership-plans";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { MembershipPlan } from "@prisma/client";

export const MembershipPlanForm = ({
  membershipPlan,
}: {
  membershipPlan?: MembershipPlan;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof membershipPlanSchema>>({
    resolver: zodResolver(membershipPlanSchema),
    defaultValues: {
      name: membershipPlan?.name || "",
      durationInMonth: membershipPlan?.durationInMonth || 0,
      price: membershipPlan?.price || 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof membershipPlanSchema>) {
    startTransition(() => {
      if (membershipPlan) {
        updateMembershipPlan({ values, membershipPlanId: membershipPlan.id }).then(({error, success}) => {
          if(success) {
            toast.success(success);
            router.push('/membership-plans');
            router.refresh();
          } else {
            toast.error(error)
          }
        })
      } else {
        createMembershipPlan(values).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            form.reset();
            router.push("/membership-plans");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durationInMonth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration in Month</FormLabel>
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
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {membershipPlan ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};