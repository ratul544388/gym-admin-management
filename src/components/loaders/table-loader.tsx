import "./loader.css";

export const TableLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-950/5 dark:bg-black/50">
      <div className="loader lg:ml-[260px]"></div>;
    </div>
  );
};
