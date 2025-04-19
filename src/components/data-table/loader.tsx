"use client";

import "@/components/data-table/loader.css";

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-950/5">
      <div className="loader lg:ml-[260px]"></div>;
    </div>
  );
};
