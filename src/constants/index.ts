import { MdDashboard, MdSettings } from "react-icons/md";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";

export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: MdDashboard,
    order: 3,
  },
  {
    label: "Members",
    href: "/members",
    icon: FaUsers,
    order: 2,
  },
  {
    label: "Membership Plans",
    href: "/membership-plans",
    icon: IoCardOutline,
    order: 1,
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: FaMoneyBillWave,
    order: 4,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: MdSettings,
    order: 5,
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

export const adminEmails = [
  "antoradria@gmail.com",
  "ratulislam544388@gmail.com",
];
