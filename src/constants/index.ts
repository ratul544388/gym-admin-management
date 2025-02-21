import {
  Diamond,
  DollarSign,
  LayoutDashboard,
  Settings2,
  Users2,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Members",
    icon: Users2,
    href: "/members",
  },
  {
    label: "Membership Plans",
    icon: Diamond,
    href: "/membership-plans",
  },
  {
    label: "Expenses",
    icon: DollarSign,
    href: "/expenses",
  },
  // {
  //   label: "Lockers",
  //   icon: Lock,
  //   href: "/lockers",
  // },
  {
    label: "Settings",
    icon: Settings2,
    href: "/settings",
  },
] as const;

export const placeholderImage = "/placeholder.png";

export const DEFAULT_ADMISSION_FEE = 500;

export const VIEW_PER_PAGE = 10;

export const today = new Date();

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const adminEmails = ["admin@admin.com", "ratulislam544388@gmail.com"];
