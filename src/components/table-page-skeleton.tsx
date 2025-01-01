import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface TablePageSkeletonProps {
  showSearchInput?: boolean;
}

export const TablePageSkeleton = ({
  showSearchInput,
}: TablePageSkeletonProps) => {
  return (
    <div>
      <div className="mt-3 flex h-14 items-center rounded-md border bg-background px-3">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="ml-auto h-10 w-20" />
      </div>
      {showSearchInput && (
        <div className="mt-4 flex h-10 w-full max-w-[340px] items-center rounded-md bg-background px-3">
          <Skeleton className="h-5 w-40" />
        </div>
      )}
      <div className="mt-4 overflow-x-auto rounded-md border bg-background">
        <Row isHeader />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
};

const Row = ({ isHeader }: { isHeader?: boolean }) => {
  return (
    <div className={cn("flex gap-7 border-b p-5", isHeader && "py-2")}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-7 min-w-24 lg:min-w-32 xl:min-w-40",
            i === 0 && "h-8 min-w-8 rounded-full lg:min-w-8 xl:min-w-8",
          )}
        />
      ))}
    </div>
  );
};
