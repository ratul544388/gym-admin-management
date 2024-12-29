"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/date-picker";
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
import { capitalize, formatDate, getEndDate } from "@/lib/utils";
import { memberSchema } from "@/schemas";
import { createMember, updateMember } from "@/actions/members";
import { Gender, Locker, Member, MembershipPlan } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { EditableAmount } from "@/components/editable-amount";

export const MemberForm = ({
  membershipPlans,
  member,
  lockers,
}: {
  membershipPlans?: MembershipPlan[];
  member?: Member;
  lockers: Locker[];
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [membershipPlanCost, setMembershipPlanCost] = useState<
    number | undefined
  >(undefined);
  const [lockerCost] = useState<number>(200);
  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      memberId: member?.memberId || "",
      name: member?.name || "",
      phone: member?.phone || "",
      address: member?.address || "",
      gender: member?.gender || undefined,
      membershipPlanId: member?.membershipPlanId || "",
      membershipPlanStartDate: member?.membershipPlanStartDate || undefined,
      lockerId: member?.lockerId || "",
      lockerStartDate: member?.lockerStartDate || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof memberSchema>) {
    startTransition(() => {
      if (!membershipPlanCost || !membershipPlanEndDate) return;
      if (member) {
        updateMember({
          id: member.id,
          values,
          membershipPlanCost,
          membershipPlanEndDate,
          lockerCost,
          lockerEndDate,
        }).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            router.push("/members");
          } else {
            toast.error(error);
          }
        });
      } else {
        createMember({
          values,
          membershipPlanCost,
          membershipPlanEndDate,
          lockerCost,
          lockerEndDate,
        }).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            router.push("/members");
          } else {
            toast.error(error);
          }
        });
      }
      router.refresh();
    });
  }

  const membershipPlanStartDate = form.getValues("membershipPlanStartDate");
  const lockerStartDate = form.getValues("lockerStartDate");
  const membershipPlanId = form.getValues("membershipPlanId");
  const lockerId = form.getValues("lockerId");

  const selectedMembershipPlan = useMemo(() => {
    return membershipPlans?.find((plan) => plan.id === membershipPlanId);
  }, [membershipPlanId, membershipPlans]);

  useEffect(() => {
    if (!selectedMembershipPlan) return;
    const cost = selectedMembershipPlan.price + 500 + 200;
    setMembershipPlanCost(cost);
  }, [selectedMembershipPlan]);

  const membershipPlanEndDate = useMemo(() => {
    if (membershipPlanStartDate && selectedMembershipPlan) {
      return getEndDate({
        startDate: membershipPlanStartDate,
        durationInMonth: selectedMembershipPlan.durationInMonth,
      });
    }
  }, [membershipPlanStartDate, selectedMembershipPlan]);

  const lockerEndDate = useMemo(() => {
    if (lockerStartDate) {
      return getEndDate({ startDate: lockerStartDate, durationInMonth: 1 });
    }
  }, [lockerStartDate]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 rounded-md border border-dashed p-5 shadow-md"
      >
        <FormField
          control={form.control}
          name="memberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="ID" {...field} />
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
                <Input placeholder="Name" {...field} />
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
                <Input type="number" placeholder="Phone" {...field} />
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
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div>
          <FormField
            control={form.control}
            name="membershipPlanStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={(value) => {
                      if (!membershipPlanId || !value) {
                        console.log({ value, membershipPlanId });
                        return toast.error(
                          "Please Select a Membership Plan first",
                        );
                      }
                      form.setValue("membershipPlanStartDate", value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {membershipPlanEndDate && (
            <p className="text-sm font-medium text-blue-500">
              The Membership will be expired on{" "}
              {formatDate({ date: membershipPlanEndDate })}
            </p>
          )}
        </div>
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Upload an image"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="lockerId"
          render={({}) => (
            <FormItem>
              <FormLabel>Locker No</FormLabel>
              <FormControl>
                <Select
                  defaultValue={lockerId}
                  onValueChange={(value) =>
                    form.setValue("lockerId", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Locker" />
                  </SelectTrigger>
                  <SelectContent>
                    {lockers?.map(({ lockerNo, id }) => {
                      return (
                        <SelectItem value={id} key={id}>
                          {lockerNo}
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
        <div>
          <FormField
            control={form.control}
            name="lockerStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Locker Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={(value) => {
                      if (!membershipPlanId || !lockerId || !value) {
                        console.log({ membershipPlanId, lockerId, value });
                        return toast.error(
                          "Please Select a Membership Plan or Locker first",
                        );
                      }
                      form.setValue("lockerStartDate", value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {lockerEndDate && (
            <p className="text-sm font-medium text-blue-500">
              The Membership will be expired on{" "}
              {formatDate({ date: lockerEndDate })}
            </p>
          )}
        </div>
        <div className="ml-auto flex items-center gap-3">
          {membershipPlanCost && (
            <>
              <p className="font-semibold text-blue-500">Paying Amount</p>
              <EditableAmount
                value={membershipPlanCost}
                onChange={setMembershipPlanCost}
              />
            </>
          )}
          <Button type="submit" disabled={isPending}>
            {member ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
