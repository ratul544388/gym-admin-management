"use client";

import { capitalize, cn } from "@/lib/utils";
import { FullMemberType, StatusType } from "@/types";
import { differenceInDays, startOfDay } from "date-fns";

interface StatusCellProps {
  member: FullMemberType;
}

export const StatusCell = ({ member }: StatusCellProps) => {
  const { startDate, endDate, isMembershipPlanRenewed: hasRenewed } = member;

  const today = startOfDay(new Date());
  const start = startOfDay(new Date(startDate));
  const end = startOfDay(new Date(endDate));

  let status: StatusType;
  let message: string;
  let dayDifference: number;

  if (start > today && !hasRenewed) {
    status = "PENDING";
    dayDifference = differenceInDays(start, today);
    message = `${dayDifference} ${dayDifference > 1 ? "days" : "day"} to go`;
  } else if (today > end) {
    status = "EXPIRED";
    dayDifference = differenceInDays(today, end);
    message = `${dayDifference} ${dayDifference > 1 ? "days" : "day"} exceeded`;
  } else {
    status = "ACTIVE";
    dayDifference = differenceInDays(end, today);
    message = `${dayDifference} ${dayDifference > 1 ? "days" : "day"} left`;
  }

  return (
    <div className="ml-4">
      <div
        className={cn(
          "text-white w-fit flex text-sm font-medium py-[1px] px-3 rounded-full hover:opacity-90 transition-opacity",
          status === "ACTIVE"
            ? "bg-blue-500"
            : status === "PENDING"
            ? "bg-orange-500"
            : "bg-destructive"
        )}
      >
        {capitalize(status)}
      </div>
      <p className="mt-2 text-muted-foreground">{message}</p>
    </div>
  );
};
