"use client";

import { assignLocker } from "@/actions/lockers";
import { DatePicker } from "@/components/date-picker";
import { FormCard } from "@/components/form-card";
import { ModifiedCostPopover } from "@/components/modified-cost-popover";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { formatDate, getEndDate } from "@/lib/utils";
import { Locker } from "@prisma/client";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { LockerDurationAdjuster } from "./locker-duration-adjuster";

interface RenewLockerProps {
  member: {
    id: string;
    imageUrl: string | null;
    name: string;
    lockerEndDate: Date;
  };
  locker: Locker;
}

export const RenewLockerForm = ({ member, locker }: RenewLockerProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [modifiedCost, setModifiedCost] = useState<number | undefined>();
  const [lockerDurationInMonth, setLockerDurationInMonth] = useState(1);

  const { id: lockerId, lockerNo } = locker;
  const { id: memberId, imageUrl, lockerEndDate } = member;
  const [startDate, setStartDate] = useState(lockerEndDate);

  // 2. Define a submit handler.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      if (!endDate) return;

      const values = {
        memberId,
        lockerId,
        startDate,
      };

      assignLocker({ values, cost: price, endDate, isRenew: true }).then(
        ({ success, error }) => {
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
        },
      );
    });
  }

  const price = useMemo(() => {
    if (modifiedCost !== undefined) return modifiedCost;
    return locker.price * lockerDurationInMonth;
  }, [locker.price, modifiedCost, lockerDurationInMonth]);

  const endDate = useMemo(() => {
    return getEndDate({ startDate, durationInMonth: 1 });
  }, [startDate]);

  return (
    <form onSubmit={handleSubmit}>
      <FormCard>
        <div>
          <p className="text-sm">Member</p>
          <div className="mt-2 flex h-10 items-center gap-3 rounded-sm border border-input px-3">
            <UserAvatar src={imageUrl} alt={member.name} />
            <p className="text-sm font-medium">{member.name}</p>
          </div>
        </div>
        <div>
          <p className="text-sm">Locker</p>
          <div className="mt-2 flex h-10 items-center rounded-sm border border-input px-3">
            {lockerNo}
          </div>
        </div>
        <div>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            disabled={isPending}
          />
          {endDate && (
            <p className="text-sm font-medium text-blue-500">
              The Membership will be expired on {formatDate({ date: endDate })}
            </p>
          )}
        </div>
        <LockerDurationAdjuster
          value={lockerDurationInMonth}
          onChange={(value) => {
            setLockerDurationInMonth(value);
            setModifiedCost(undefined);
          }}
        />
        <div className="flex items-center justify-end gap-3">
          <div className="font-semibold text-primary">
            Paying Amount:&nbsp;
            <ModifiedCostPopover value={price} onChange={setModifiedCost}>
              {price}/-
            </ModifiedCostPopover>
          </div>
          <Button type="submit" disabled={isPending}>
            Assign
          </Button>
        </div>
      </FormCard>
    </form>
  );
};
