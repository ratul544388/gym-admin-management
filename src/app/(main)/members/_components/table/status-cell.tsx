"use client";

import { capitalize, cn } from "@/lib/utils";
import { FullMemberType, StatusType } from "@/types";
import { differenceInDays, startOfToday } from "date-fns";

interface StatusCellProps {
  member: FullMemberType;
}
export const StatusCell = ({ member }: StatusCellProps) => {
  const { startDate, endDate, isMembershipPlanRenewed: hasRenewed } = member;
  let status: StatusType;
  let message: string;
  let dayDifference: number;

  if (startDate > startOfToday() && !hasRenewed) {
    status = "PENDING";
    dayDifference = differenceInDays(startDate, startOfToday());
    message = `${dayDifference} ${dayDifference > 1 ? "days" : "day"} to go`;
  } else if (startOfToday() > endDate) {
    status = "EXPIRED";
    dayDifference = differenceInDays(startOfToday(), endDate);
    message = `${dayDifference} ${dayDifference > 1 ? "days" : "day"} exceeded`;
  } else {
    status = "ACTIVE";
    dayDifference = differenceInDays(endDate, startOfToday());
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
