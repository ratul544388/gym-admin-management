import { StatusType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = ({
  date,
  showTime,
}: {
  date: Date;
  showTime?: boolean;
}) => {
  if (showTime) {
    return format(date, "dd MMM yyyy - h:mm a");
  } else {
    return format(date, "dd MMM yyyy");
  }
};

export const capitalize = (text: string) => {
  return text.split("")[0].toUpperCase() + text.toLowerCase().slice(1);
};

export const getStatus = ({
  startDate,
  endDate,
  hasRenewed,
}: {
  startDate: Date;
  endDate: Date;
  hasRenewed: boolean;
}): StatusType => {
  const today = new Date();
  if (startDate > today && !hasRenewed) {
    return "PENDING";
  } else if (today > endDate) {
    return "EXPIRED";
  } else {
    return "ACTIVE";
  }
};

export const getLockerStatus = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}): StatusType => {
  const today = new Date();
  if (today < startDate) {
    return "PENDING";
  } else if (today > endDate) {
    return "EXPIRED";
  }
  return "ACTIVE";
};

export const getEndDate = ({
  startDate,
  durationInMonth,
}: {
  startDate: Date;
  durationInMonth: number;
}) => {
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + durationInMonth);
  return endDate;
};
