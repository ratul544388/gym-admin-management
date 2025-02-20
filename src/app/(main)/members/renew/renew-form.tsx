"use client";

import { renewMembershipPlan } from "@/actions/members";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CostModifier } from "@/components/cost-modifier";
import { DatePicker } from "@/components/date-picker";
import { FormCard } from "@/components/form-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, getEndDate } from "@/lib/utils";
import { RenewMemberSchema, RenewMemberValues } from "@/validations";
import { Member, MembershipPlan } from "@prisma/client";

export const RenewForm = ({
  member,
  membershipPlans,
}: {
  member: Member;
  membershipPlans: MembershipPlan[];
}) => {
  const [isPending, startTransition] = useTransition();
  const [modifiedCost, setModifiedCost] = useState<number | undefined>(
    undefined
  );

  const router = useRouter();

  const form = useForm<RenewMemberValues>({
    resolver: zodResolver(RenewMemberSchema),
    defaultValues: {
      startDate: member.startDate,
      membershipPlanId: member.membershipPlanId,
    },
  });

  const startDate = form.getValues("startDate");
  const membershipPlanId = form.getValues("membershipPlanId");

  const membershipPlan = useMemo(() => {
    setModifiedCost(undefined);
    return membershipPlans.find(
      (plan) => plan.id === membershipPlanId
    ) as MembershipPlan;
  }, [membershipPlans, membershipPlanId]);

  const cost = useMemo(() => {
    if (modifiedCost) {
      return modifiedCost;
    }
    return membershipPlan.price;
  }, [membershipPlan.price, modifiedCost]);

  const endDate = useMemo(() => {
    return getEndDate({
      startDate,
      durationInMonth: membershipPlan.durationInMonth,
    });
  }, [startDate, membershipPlan.durationInMonth]);

  function onSubmit(values: RenewMemberValues) {
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

  form.watch("membershipPlanId");

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
              The Membership will be expired on {formatDate(endDate)}
            </p>
          </div>
          <FormField
            control={form.control}
            name="membershipPlanId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Membership Plan</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Membership Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {membershipPlans?.map(({ name, id, durationInMonth }) => {
                        const formattedName = `${name} - (${durationInMonth} ${
                          durationInMonth > 1 ? "Months" : "Month"
                        })`;
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
          <CostModifier value={cost} onChange={setModifiedCost} />
          <Button disabled={isPending} type="submit">
            Renew
          </Button>
        </FormCard>
      </form>
    </Form>
  );
};
