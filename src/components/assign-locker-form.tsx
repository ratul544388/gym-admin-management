"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormCard } from "@/components/form-card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, formatDate, getEndDate } from "@/lib/utils";
import { assignLockerSchema } from "@/schemas";
import { assignLocker, getAvailableLockers } from "@/actions/lockers";
import {
  InvalidateQueryFilters,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Combobox } from "./combobox";
import { DatePicker } from "./date-picker";
import { MemberCombobox } from "./members-combobox";
import { LockerDurationAdjuster } from "@/app/(site)/lockers/_components/locker-duration-adjuster";
import { ModifiedCostPopover } from "./modified-cost-popover";

export const AssignLockerForm = ({
  lockerId,
  memberId,
}: {
  lockerId?: string;
  memberId?: string;
}) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [modifiedCost, setModifiedCost] = useState<number | undefined>(
    undefined,
  );
  const [lockerDurationInMonth, setLockerDurationInMonth] = useState(1);
  const router = useRouter();
  const form = useForm<z.infer<typeof assignLockerSchema>>({
    resolver: zodResolver(assignLockerSchema),
    defaultValues: {
      lockerId: lockerId || "",
      memberId: memberId || "",
      startDate: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof assignLockerSchema>) {
    startTransition(() => {
      if (!endDate || !cost) return;
      assignLocker({ values, endDate, cost }).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          router.back();
          queryClient.invalidateQueries([
            "availableLockers",
            "searchMemberOnAssignLockerForm",
          ] as InvalidateQueryFilters);
          router.refresh();
        } else {
          toast.error(error);
        }
      });
    });
  }

  const { data: lockers, isPending: isFetchingLockers } = useQuery({
    queryKey: ["availableLockers"],
    queryFn: async () => await getAvailableLockers(),
  });

  const selectedMemberId = form.getValues("memberId");
  const selectedLockerId = form.getValues("lockerId");
  const startDate = form.getValues("startDate");
  
  const endDate = startDate
    ? getEndDate({ startDate, durationInMonth: 1 })
    : undefined;

  const selectedLocker = useMemo(() => {
    return lockers?.find((locker) => locker.id === selectedLockerId);
  }, [lockers, selectedLockerId]);

  const cost = useMemo(() => {
    if (!selectedLocker) return;
    if (modifiedCost !== undefined) return modifiedCost;
    return selectedLocker.price * lockerDurationInMonth;
  }, [lockerDurationInMonth, modifiedCost, selectedLocker]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <div
            className={cn(
              "flex flex-col gap-8",
              memberId && "flex-col-reverse",
            )}
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="lockerId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Locker</FormLabel>
                    <FormControl>
                      <Combobox
                        disabled={isFetchingLockers}
                        value={field.value}
                        onChange={field.onChange}
                        options={
                          lockers?.map(({ lockerNo, id }) => {
                            return {
                              label: lockerNo.toString(),
                              value: id,
                            };
                          }) || []
                        }
                        placeholder="Select Locker"
                        isLoadingOptions={isFetchingLockers}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedLockerId && (
                <LockerDurationAdjuster
                  value={lockerDurationInMonth}
                  onChange={(value) => {
                    setLockerDurationInMonth(value);
                    setModifiedCost(undefined);
                  }}
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Member</FormLabel>
                  <FormControl>
                    <MemberCombobox
                      memberId={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locker Start Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={(value) => {
                        if (!selectedMemberId || !selectedLockerId || !value) {
                          return toast.error(
                            "Please Select a Membership Plan or Locker first",
                          );
                        }
                        form.setValue("startDate", value, {
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
                The Membership will be expired on{" "}
                {formatDate({ date: endDate })}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-3 font-semibold text-primary">
            {selectedLocker && (
              <div>
                Paying Amount:&nbsp;
                <ModifiedCostPopover value={cost} onChange={setModifiedCost}>
                  {cost}/-
                </ModifiedCostPopover>
              </div>
            )}
            <Button type="submit">Assign</Button>
          </div>
        </FormCard>
      </form>
    </Form>
  );
};
