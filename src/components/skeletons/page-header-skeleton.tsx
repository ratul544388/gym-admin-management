"use client";

import { Skeleton } from "../ui/skeleton";

interface PageHeaderSkeletonProps {
  action?: boolean;
}

export const PageHeaderSkeleton = ({ action }: PageHeaderSkeletonProps) => {
  return (
    <div className="flex py-3 border-b items-center gap-10 justify-between">
      <Skeleton className="w-32 h-6" />
      {action && <Skeleton className="w-28 h-9" />}
    </div>
  );
};
