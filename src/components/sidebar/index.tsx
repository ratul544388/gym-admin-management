"use client";

import { SidebarItems } from "./sidebar-items";

export const Sidebar = () => {
  return (
    <aside className="sticky top-[70px] border-r hidden md:block w-[250px] h-[calc(100vh_-_70px)]">
      <SidebarItems />
    </aside>
  );
};
