"use client";

import { createMember, updateMember } from "@/actions/members";
import { useFormError } from "@/hooks/use-form-error";
import { capitalize, cn, formatDate, getEndDate } from "@/lib/utils";
import { MemberSchema, MemberValues } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, Member, MembershipPlan } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CostModifier } from "../../../../components/cost-modifier";
import { ImageUpload } from "../../../../components/image-upload";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "../../../../components/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { FormCard } from "../../../../components/form-card";
import { DatePicker } from "@/components/date-picker";
import { useQueryClient } from "@tanstack/react-query";

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
  const [isImageUploading, setIsImageUploading] = useState(false);
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
      return getEndDate({
        startDate: startDate,
        durationInMonth: selectedMembershipPlan.durationInMonth,
      });
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
          <FormField
            control={form.control}
            name="memberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter member's ID"
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter member's name"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter member's phone number"
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    disabled={isPending}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      className={cn(
                        "text-muted-foreground",
                        field.value && "text-foreground"
                      )}
                    >
                      <SelectValue placeholder="Enter member's gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Gender).map((item) => {
                        return (
                          <SelectItem value={item} key={item}>
                            {capitalize(item)}
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
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="number"
                    placeholder="Enter member's age"
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter member's address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!member && (
            <>
              {" "}
              <FormField
                control={form.control}
                name="membershipPlanId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Membership Plan</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isPending}
                        defaultValue={membershipPlanId}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={cn(
                            "text-muted-foreground",
                            field.value && "text-foreground"
                          )}
                        >
                          <SelectValue placeholder="Membership Plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {membershipPlans?.map(
                            ({ name, id, durationInMonth }) => {
                              const formattedName = `${name} - (${durationInMonth} ${
                                durationInMonth > 1 ? "Months" : "Month"
                              })`;
                              return (
                                <SelectItem value={id} key={id}>
                                  {formattedName}
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          disabled={isPending}
                          value={field.value}
                          onChange={(value) => {
                            if (!membershipPlanId) {
                              console.log({ value, membershipPlanId });
                              return toast.error(
                                "Please Select a Membership Plan first"
                              );
                            }
                            form.setValue("startDate", value as Date, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
                    isImageUploading={isImageUploading}
                    onChangeUploadingImage={setIsImageUploading}
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
            isLoading={isPending || isImageUploading}
            type="submit"
          >
            {member ? "Save" : "Create"}
          </LoadingButton>
        </FormCard>
      </form>
    </Form>
  );
};
