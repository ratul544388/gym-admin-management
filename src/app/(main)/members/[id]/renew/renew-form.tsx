"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form
} from "@/components/ui/form";

import { CostModifier } from "@/components/cost-modifier";
import { FormCard } from "@/components/form-card";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormSelect } from "@/components/form-select";
import { LoadingButton } from "@/components/loading-button";
import { formatDate, getEndDate } from "@/lib/utils";
import { RenewMemberSchema, RenewMemberValues } from "@/validations";
import { Member, MembershipPlan } from "@prisma/client";
import { startOfDay } from "date-fns";
import { renewMembershipPlan } from "../../actions";

export const RenewForm = ({
  member,
  membershipPlans,
}: {
  member: Member;
  membershipPlans: MembershipPlan[];
}) => {
  const [isPending, startTransition] = useTransition();
  const [modifiedCost, setModifiedCost] = useState<number | undefined>(
    undefined,
  );

  const router = useRouter();

  const form = useForm<RenewMemberValues>({
    resolver: zodResolver(RenewMemberSchema),
    defaultValues: {
      startDate: startOfDay(member.endDate),
      membershipPlanId: member.membershipPlanId,
    },
  });

  const startDate = form.getValues("startDate");
  const membershipPlanId = form.getValues("membershipPlanId");

  const membershipPlan = useMemo(() => {
    setModifiedCost(undefined);
    return membershipPlans.find(
      (plan) => plan.id === membershipPlanId,
    ) as MembershipPlan;
  }, [membershipPlans, membershipPlanId]);

  const cost = useMemo(() => {
    if (modifiedCost) {
      return modifiedCost;
    }
    return membershipPlan.price;
  }, [membershipPlan.price, modifiedCost]);

  const endDate = useMemo(() => {
    return getEndDate(startDate, membershipPlan.durationInMonth);
  }, [startDate, membershipPlan.durationInMonth]);

  function onSubmit(values: RenewMemberValues) {
    startTransition(() => {
      renewMembershipPlan({
        values,
        cost,
        endDate,
        memberId: member.id,
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
            <FormDatePicker
              control={form.control}
              name="startDate"
              disabled={isPending}
            />
            <p className="text-sm font-medium text-blue-500">
              The Membership will be expired on {formatDate(endDate)}
            </p>
          </div>
          <FormSelect
            control={form.control}
            name="membershipPlanId"
            label="Membership Plan"
            options={membershipPlans.map(({ name, id, durationInMonth }) => {
              const formattedName = `${name} - ${durationInMonth > 1 ? "Months" : "Month"}`;
              return {
                label: formattedName,
                value: id,
              };
            })}
          />
          <CostModifier value={cost} onChange={setModifiedCost} />
          <LoadingButton isLoading={isPending} type="submit">
            Renew
          </LoadingButton>
        </FormCard>
      </form>
    </Form>
  );
};
