"use client";

import { useFormError } from "@/hooks/use-form-error";
import { formatDate, getEndDate } from "@/lib/utils";
import { MemberSchema, MemberValues } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, Member, MembershipPlan } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CostModifier } from "../../../../components/cost-modifier";
import { ImageUpload } from "../../../../components/image-upload";

import { FormDatePicker } from "@/components/form-date-picker";
import { FormInput } from "@/components/form-input";
import { FormSelect } from "@/components/form-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { FormCard } from "../../../../components/form-card";
import { LoadingButton } from "../../../../components/loading-button";
import { createMember, updateMember } from "../actions";

interface MemberFormProps {
  member?: Member;
  membershipPlans: MembershipPlan[];
  admissionFee?: number;
}

export const MemberForm = ({
  member,
  membershipPlans,
  admissionFee = 0,
}: MemberFormProps) => {
  const queryClient = useQueryClient();
  const [cost, setCost] = useState(0);
  const [modifiedCost, setModifiedCost] = useState(0);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { FormError, setError } = useFormError();
  const router = useRouter();

  const form = useForm<MemberValues>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      memberId: member?.memberId || 0,
      name: member?.name || "",
      gender: member?.gender || undefined,
      address: member?.address || "",
      age: member?.age || 0,
      image: member?.image || "",
      membershipPlanId: member?.membershipPlanId || undefined,
      phone: member?.phone || "",
      startDate: member?.startDate || undefined,
    },
  });

  const membershipPlanId = form.getValues("membershipPlanId");

  const selectedMembershipPlan = useMemo(() => {
    return membershipPlans?.find((plan) => plan.id === membershipPlanId);
  }, [membershipPlanId, membershipPlans]);

  const startDate = form.getValues("startDate");
  const endDate = useMemo(() => {
    if (startDate && selectedMembershipPlan) {
      return getEndDate(startDate, selectedMembershipPlan.durationInMonth);
    }
  }, [startDate, selectedMembershipPlan]);

  const onSubmit = (values: MemberValues) => {
    if (!endDate) return;
    startTransition(() => {
      if (member) {
        updateMember({
          values,
          id: member.id,
        }).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            router.push("/members");
            router.refresh();
            queryClient.invalidateQueries({
              queryKey: ["membershipStatusCounts"],
            });
          } else {
            setError(error);
          }
        });
      } else {
        createMember({
          values,
          endDate,
          cost,
        }).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            router.push("/members");
            router.refresh();
            queryClient.invalidateQueries({
              queryKey: ["membershipStatusCounts"],
            });
          } else {
            setError(error);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (!selectedMembershipPlan) return;
    if (modifiedCost) {
      return setCost(modifiedCost);
    }
    const total = admissionFee + selectedMembershipPlan.price;
    setCost(total);
  }, [setCost, selectedMembershipPlan, admissionFee, modifiedCost]);

  form.watch("membershipPlanId");


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormInput
            control={form.control}
            name="memberId"
            label="ID"
            disabled={isPending}
            autoFocus
            type="number"
          />
          <FormInput control={form.control} name="name" disabled={isPending} />
          <FormInput
            control={form.control}
            name="phone"
            disabled={isPending}
            type="number"
          />
          <FormSelect
            control={form.control}
            name="gender"
            options={Object.values(Gender).map((g) => g)}
            disabled={isPending}
          />
          <FormInput
            control={form.control}
            name="age"
            disabled={isPending}
            type="number"
          />
          <FormInput
            control={form.control}
            name="address"
            disabled={isPending}
          />
          {!member && (
            <>
              <FormSelect
                control={form.control}
                name="membershipPlanId"
                label="Membership Plan"
                options={membershipPlans.map(
                  ({ name, id, durationInMonth }) => {
                    const formattedName = `${name} - ${durationInMonth > 1 ? "Months" : "Month"}`;
                    return {
                      label: formattedName,
                      value: id,
                    };
                  },
                )}
              />
              <div>
                <FormDatePicker
                  control={form.control}
                  name="startDate"
                  label="Start Date"
                  disabled={isPending}
                />
                {endDate && (
                  <p className="text-sm font-medium text-blue-500">
                    The Membership will be expired on {formatDate(endDate)}
                  </p>
                )}
              </div>
            </>
          )}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                    isImageUploading={isUploadingImage}
                    onChangeUploadingImage={setIsUploadingImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError />
          {selectedMembershipPlan && !member && (
            <CostModifier value={cost} onChange={setModifiedCost} />
          )}
          <LoadingButton
            isLoading={isPending}
            disabled={isUploadingImage}
            type="submit"
          >
            {member ? "Save" : "Create"}
          </LoadingButton>
        </FormCard>
      </form>
    </Form>
  );
};
