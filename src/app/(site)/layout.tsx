import { DesktopSidebar } from "@/components/sidebars/desktop-sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <div className="px-4 pb-20 md:pl-[256px]">
    <DesktopSidebar/>
    {children}
  </div>;
}
