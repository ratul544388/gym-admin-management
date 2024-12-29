import { Diamond, DollarSign, LayoutDashboard, Lock, Settings2, Users } from "lucide-react";

export const sidebarItems = [
    {
        label: "Dashboard",
        icon: Users,
        href: "/dashboard",
    },
    {
        label: "Members",
        icon: LayoutDashboard,
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
    {
        label: "Lockers",
        icon: Lock,
        href: "/lockers",
    },
    {
        label: "Settings",
        icon: Settings2,
        href: "/settings",
    },
] as const;

export const placeholderImage = "/placeholder.png";