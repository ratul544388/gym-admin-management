"use client";


import { SidebarItems } from "./sidebar-items";


export const DesktopSidebar = () => {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-[240px] space-y-5 border-r py-5 md:flex">
        <SidebarItems />
      </aside>
    </>
  );
};
