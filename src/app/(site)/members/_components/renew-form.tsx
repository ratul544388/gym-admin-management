"use client";

import { Button } from "@/components/ui/button";
import { renewMembershipPlan } from "@/actions/members";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DatePicker } from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, getEndDate } from "@/lib/utils";
import { renewMemberSchema } from "@/schemas";
import { Member, MembershipPlan } from "@prisma/client";
import { FormCard } from "@/components/form-card";
import { ModifiedCostPopover } from "@/components/modified-cost-popover";

export const RenewForm = ({
  member,
  membershipPlans,
}: {
  member: Member;
  membershipPlans: MembershipPlan[];
}) => {
  const [isPending, startTransition] = useTransition();
  const [modifiedPayingAmount, setModifiedPayingAmount] = useState<
    number | undefined
  >(undefined);

  const router = useRouter();

  const form = useForm<z.infer<typeof renewMemberSchema>>({
    resolver: zodResolver(renewMemberSchema),
    defaultValues: {
      startDate: member.membershipPlanEndDate,
      membershipPlanId: member.membershipPlanId,
    },
  });

  const startDate = form.getValues("startDate");
  const membershipPlanId = form.getValues("membershipPlanId");

  const membershipPlan = useMemo(() => {
    setModifiedPayingAmount(undefined);
    return membershipPlans.find(
      (plan) => plan.id === membershipPlanId,
    ) as MembershipPlan;
  }, [membershipPlans, membershipPlanId]);

  const cost = useMemo(() => {
    if (modifiedPayingAmount) {
      return modifiedPayingAmount;
    }
    return membershipPlan.price;
  }, [membershipPlan.price, modifiedPayingAmount]);

  const endDate = useMemo(() => {
    return getEndDate({
      startDate,
      durationInMonth: membershipPlan.durationInMonth,
    });
  }, [startDate, membershipPlan.durationInMonth]);

  function onSubmit(values: z.infer<typeof renewMemberSchema>) {
    startTransition(() => {
      renewMembershipPlan({
        values,
        cost,
        endDate,
        id: member.id,
      }).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          router.push("/members");
        } else {
          toast.error(error);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormCard>
          <div>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm font-medium text-blue-500">
              The Membership will be expired on {formatDate({ date: endDate })}
            </p>
          </div>
          <FormField
            control={form.control}
            name="membershipPlanId"
            render={({}) => (
              <FormItem>
                <FormLabel>Membership Plan</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={membershipPlanId}
                    onValueChange={(value) =>
                      form.setValue("membershipPlanId", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Membership Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {membershipPlans?.map(({ name, id, durationInMonth }) => {
                        const formattedName = `${name} - (${durationInMonth} ${durationInMonth > 1 ? "Months" : "Month"})`;
                        return (
                          <SelectItem value={id} key={id}>
                            {formattedName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-4">
            <div className="flex gap-3 font-semibold text-blue-500">
              Paying Amount
              <ModifiedCostPopover
                title="Modify Paying Amount"
                value={cost}
                onChange={setModifiedPayingAmount}
              >
                {cost}/-
              </ModifiedCostPopover>
            </div>
            <Button disabled={isPending} type="submit">
              Renew
            </Button>
          </div>
        </FormCard>
      </form>
    </Form>
  );
};
