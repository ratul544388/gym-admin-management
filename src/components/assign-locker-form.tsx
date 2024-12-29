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
import { useTransition } from "react";
import { toast } from "sonner";
import { Combobox } from "./combobox";
import { DatePicker } from "./date-picker";
import { MemberCombobox } from "./members-combobox";

export const AssignLockerForm = ({
  lockerId,
  memberId,
}: {
  lockerId?: string;
  memberId?: string;
}) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
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
      if (!endDate) return;
      assignLocker({ values, endDate, cost: 200 }).then(
        ({ success, error }) => {
          if (success) {
            toast.success(success);
            form.reset();
            router.push(memberId ? "/members" : "/lockers");
            queryClient.invalidateQueries([
              "availableLockers",
              "searchMemberOnAssignLockerForm",
            ] as InvalidateQueryFilters);
            router.refresh();
          } else {
            toast.error(error);
          }
        },
      );
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
            <FormField
              control={form.control}
              name="lockerId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Locker</FormLabel>
                  <FormControl>
                    <Combobox
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
          <Button type="submit" disabled={isPending} className="ml-auto">
            Assign
          </Button>
        </FormCard>
      </form>
    </Form>
  );
};
