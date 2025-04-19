import { Skeleton } from "../ui/skeleton";
import { PageHeaderSkeleton } from "./page-header-skeleton";

interface TablePageSkeletonProps {
  searchInput?: boolean;
  sortbyFilter?: boolean;
}

export const TablePageSkeleton = ({
  searchInput = true,
  sortbyFilter = true,
}: TablePageSkeletonProps) => {
  return (
    <div className="space-y-4">
      <PageHeaderSkeleton action />
      <div className="flex items-center gap-3">
        {searchInput && <Skeleton className="h-9 w-full max-w-[450px]" />}
        {sortbyFilter && <Skeleton className="size-9" />}
      </div>
      <div className="w-full max-w-[1200px] border rounded-lg">
        <div className="flex items-center px-2 py-3 border-b">
          <Skeleton className="size-5 min-w-5" />
          <Skeleton className="size-4 min-w-4 ml-3" />
          <Skeleton className="h-4 min-w-12 ml-7" />
          <Skeleton className="h-4 min-w-12 ml-14" />
          <Skeleton className="h-4 min-w-16 ml-16" />
          <Skeleton className="h-4 min-w-24 ml-14" />
          <Skeleton className="h-4 min-w-14 ml-10" />
          <Skeleton className="h-4 min-w-14 ml-10" />
          <Skeleton className="h-4 min-w-14 ml-10" />
        </div>
      </div>
    </div>
  );
};
