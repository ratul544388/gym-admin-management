"use client";

import {
  createMembershipPlan,
  updateMembershipPlan,
} from "@/actions/membership-plans";
import { useFormError } from "@/hooks/use-form-error";
import { MembershipPlanSchema, MembershipPlanValues } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { MembershipPlan } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    autoFocus={!!!membershipPlan}
                    placeholder="Name"
                    disabled={isPending}
                    {...field}
                  />
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
                    disabled={isPending}
                    value={field.value || ""}
                    onChange={field.onChange}
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
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Price"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError />
          <LoadingButton type="submit" isLoading={isPending}>
            {membershipPlan ? "Update" : "Create"}
          </LoadingButton>
        </FormCard>
      </form>
    </Form>
  );
};
