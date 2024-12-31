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

import { createMember } from "@/actions/members";
import { DatePicker } from "@/components/date-picker";
import { FormCard } from "@/components/form-card";
import { ImageUpload } from "@/components/image-upload";
import { LoadingButton } from "@/components/loading-button";
import { ModifiedCostPopover } from "@/components/modified-cost-popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_ADMISSION_FEE } from "@/constants";
import { capitalize, formatDate, getEndDate } from "@/lib/utils";
import { createMemberSchema } from "@/schemas";
import { Gender, Locker, MembershipPlan } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

export const CreateMemberForm = ({
  membershipPlans,
  lockers,
  admissionFee = DEFAULT_ADMISSION_FEE,
}: {
  membershipPlans?: MembershipPlan[];
  lockers: Locker[];
  admissionFee?: number;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [lockerDurationInMonth, setLockerDurationInMonth] = useState(1);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [modifiedTotalCost, setModifiedTotalCost] = useState<
    number | undefined
  >();
  const [modifiedLockerCost, setModifiedLockerCost] = useState<
    number | undefined
  >();
  const form = useForm<z.infer<typeof createMemberSchema>>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      memberId: "",
      name: "",
      phone: "",
      address: "",
      gender: undefined,
      imageUrl: "",
      membershipPlanId: "",
      membershipPlanStartDate: undefined,
      lockerId: "",
      lockerStartDate: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createMemberSchema>) {
    startTransition(() => {
      if (!totalCost || !membershipPlanEndDate) return;
      createMember({
        values,
        totalCost,
        membershipPlanEndDate,
        lockerCost: selectedLocker?.price,
        lockerEndDate,
      }).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          router.push("/members");
        } else {
          toast.error(error);
        }
      });
      router.refresh();
    });
  }

  const membershipPlanStartDate = form.getValues("membershipPlanStartDate");
  const lockerStartDate = form.getValues("lockerStartDate");
  const membershipPlanId = form.getValues("membershipPlanId");
  const lockerId = form.getValues("lockerId");
  const [isCheckedLocker, setIsCheckedLocker] = useState(false);

  const selectedMembershipPlan = useMemo(() => {
    return membershipPlans?.find((plan) => plan.id === membershipPlanId);
  }, [membershipPlanId, membershipPlans]);

  const selectedLocker = useMemo(() => {
    return lockers.find((locker) => locker.id === lockerId);
  }, [lockers, lockerId]);

  const membershipPlanEndDate = useMemo(() => {
    if (membershipPlanStartDate && selectedMembershipPlan) {
      return getEndDate({
        startDate: membershipPlanStartDate,
        durationInMonth: selectedMembershipPlan.durationInMonth,
      });
    }
  }, [membershipPlanStartDate, selectedMembershipPlan]);

  const lockerCost = useMemo(() => {
    if (modifiedLockerCost !== undefined) return modifiedLockerCost;
    if (selectedLocker) {
      return selectedLocker.price * lockerDurationInMonth;
    }
  }, [lockerDurationInMonth, modifiedLockerCost, selectedLocker]);

  const totalCost = useMemo(() => {
    if (modifiedTotalCost !== undefined) return modifiedTotalCost;

    if (selectedMembershipPlan) {
      return (
        selectedMembershipPlan.price +
        (modifiedLockerCost || lockerCost || 0) +
        admissionFee
      );
    }
  }, [
    admissionFee,
    lockerCost,
    modifiedLockerCost,
    modifiedTotalCost,
    selectedMembershipPlan,
  ]);

  const lockerEndDate = useMemo(() => {
    if (lockerStartDate) {
      return getEndDate({
        startDate: lockerStartDate,
        durationInMonth: lockerDurationInMonth,
      });
    }
  }, [lockerStartDate, lockerDurationInMonth]);

  const adjustLockerDuration = (value: 1 | -1) => {
    setLockerDurationInMonth((prev) => prev + value);
    setModifiedTotalCost(undefined);
    setModifiedLockerCost(undefined);
  };

  console.log({ lockerCost, totalCost });

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
                        if (!membershipPlanId) {
                          console.log({ value, membershipPlanId });
                          return toast.error(
                            "Please Select a Membership Plan first",
                          );
                        }
                        form.setValue(
                          "membershipPlanStartDate",
                          value as Date,
                          {
                            shouldValidate: true,
                          },
                        );
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
          <FormField
            control={form.control}
            name="imageUrl"
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
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Label className="cursor-pointer" htmlFor="lockerCheckbox">
                {isCheckedLocker ? "Exclude Locker" : "Include Locker"}
              </Label>
              <Checkbox
                onCheckedChange={() => {
                  if (isCheckedLocker) {
                    form.setValue("lockerId", "");
                    form.setValue("lockerStartDate", undefined);
                  }
                  setIsCheckedLocker(!isCheckedLocker);
                }}
                id="lockerCheckbox"
                checked={isCheckedLocker}
              />
            </div>
          </div>
          {isCheckedLocker && (
            <>
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
              {selectedLocker && (
                <div>
                  <div className="flex text-sm">
                    <p className="">Locker Duration in Month - Cost:&nbsp;</p>
                    <ModifiedCostPopover
                      title="Modify Locker Cost"
                      className="text-blue-500"
                      value={lockerCost}
                      onChange={setModifiedLockerCost}
                      align="start"
                    >
                      {lockerCost}/-
                    </ModifiedCostPopover>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Button
                      onClick={() => adjustLockerDuration(-1)}
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      disabled={lockerDurationInMonth === 1}
                    >
                      <Minus className="size-4" />
                    </Button>
                    {lockerDurationInMonth}
                    <Button
                      onClick={() => adjustLockerDuration(1)}
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      disabled={lockerDurationInMonth === 12}
                    >
                      <Plus className="size-4" />
                    </Button>
                    Locker cost:
                  </div>
                </div>
              )}
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
                              console.log({
                                membershipPlanId,
                                lockerId,
                                value,
                              });
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
            </>
          )}
          <div className="ml-auto flex items-center gap-3">
            {selectedMembershipPlan && (
              <>
                <p className="font-semibold text-blue-500">Paying Amount</p>
                <ModifiedCostPopover
                  title="Modify paying amount"
                  value={totalCost}
                  onChange={setModifiedTotalCost}
                  className="font-semibold text-blue-500"
                >
                  {totalCost}
                  /-
                </ModifiedCostPopover>
              </>
            )}
            <LoadingButton isLoading={isPending} type="submit">
              Create
            </LoadingButton>
          </div>
        </FormCard>
      </form>
    </Form>
  );
};
