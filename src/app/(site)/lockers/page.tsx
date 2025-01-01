import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { VIEW_PER_PAGE } from "@/constants";
import { db } from "@/lib/db";
import { getSkip } from "@/lib/utils";
import { SearchParamsType } from "@/types";
import { columns } from "./_components/columns";

const Page = async ({ searchParams }: { searchParams: SearchParamsType }) => {
  const { page } = await searchParams;
  const skip = getSkip(page);

  // const status: StatusType = (
  //   await searchParams
  // ).status.toUpperCase();

  const [lockers, totalLockers] = await Promise.all([
    db.locker.findMany({
      include: {
        members: {
          take: 1,
          orderBy: {
            lockerStartDate: "desc",
          },
        },
      },
      take: VIEW_PER_PAGE,
      skip,
    }),
    db.locker.count(),
  ]);

  return (
    <div>
      <PageHeader label="Lockers" actionUrl="/lockers/new" />
      <DataTable
        columns={columns}
        data={lockers}
        searchInputPlaceholder="Search lockers..."
        showSearchInput
        dataCount={totalLockers}
      />
    </div>
  );
};

export default Page;
