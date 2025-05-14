"use client";

import { SidebarItems } from "./sidebar-items";

export const Sidebar = () => {
  return (
    <aside className="fixed top-[90px] rounded-xl border-r border-t hidden lg:block min-w-[260px] h-screen bg-secondary z-20">
      <SidebarItems />
    </aside>
  );
};
