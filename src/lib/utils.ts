import { VIEW_PER_PAGE } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { StatusType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    currencyDisplay: "narrowSymbol",
  }).format(price);
};

export const formatDate = (date: Date) => {
  return format(date, "dd MMM yyyy");
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

export const getSkip = (
  page: number | string = 1,
  viewPerPage: number = VIEW_PER_PAGE
) => {
  return (Number(page) - 1) * viewPerPage;
};
