import { Skeleton } from "@/components/ui/skeleton";

export const DashboardElementsSkeleton = () => {
  return (
    <div className="mt-5 space-y-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border p-5 rounded-lg">
          <Skeleton className="h-6 w-24" />
          <ul className="grid xs:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="border p-5 rounded-lg shadow mt-5">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-7 w-32 mt-2" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
