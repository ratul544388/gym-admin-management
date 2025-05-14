import { cn } from "@/lib/utils";
import "./loader.css";
export const PageLoader = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-[calc(100vh_-_75px_-_60px_-_80px)] flex items-center justify-center",
        className
      )}
    >
      <span className="loader" />
    </div>
  );
};
