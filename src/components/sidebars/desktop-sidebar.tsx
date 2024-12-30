import { NavItems } from "./nav-items";


export const DesktopSidebar = () => {
  return (
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[240px] space-y-5 border-r bg-background pt-24 pb-5 md:flex">
        <NavItems />
      </aside>
  );
};
