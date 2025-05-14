"use client";

import { useFormError } from "@/hooks/use-form-error";
import { MembershipPlanSchema, MembershipPlanValues } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { MembershipPlan } from "@prisma/client";
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
import { createMembershipPlan, updateMembershipPlan } from "../actions";

interface MembershipPlanFormProps {
  membershipPlan?: MembershipPlan;
}

export const MembershipPlanForm = ({
  membershipPlan,
}: MembershipPlanFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { FormError, setError } = useFormError();
  const router = useRouter();

  const form = useForm<MembershipPlanValues>({
    resolver: zodResolver(MembershipPlanSchema),
    defaultValues: {
      name: membershipPlan?.name || "",
      price: membershipPlan?.price || 0,
      durationInMonth: membershipPlan?.durationInMonth || 0,
    },
  });

  const onSubmit = (values: MembershipPlanValues) => {
    console.log(values);
    startTransition(() => {
      if (membershipPlan) {
        updateMembershipPlan({
          values,
          membershipPlanId: membershipPlan.id,
        }).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            router.push("/membership-plans");
            router.refresh();
          } else {
            setError(error);
          }
        });
      } else {
        createMembershipPlan(values).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            router.push("/membership-plans");
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
            name="name"
            disabled={isPending}
            autoFocus={!!!membershipPlan}
          />
          <FormInput
            control={form.control}
            disabled={isPending}
            name="durationInMonth"
            label="Duration In Month"
          />
          <FormInput
            control={form.control}
            name="price"
            disabled={isPending}
            type="number"
          />
          <FormError />
          <LoadingButton isLoading={isPending}>
            {membershipPlan ? "Update" : "Create"}
          </LoadingButton>
        </FormCard>
      </form>
    </Form>
  );
};
