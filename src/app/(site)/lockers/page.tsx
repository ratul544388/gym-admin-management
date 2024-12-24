import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { columns } from "./_components/columns";

export const dynamic = "force-dynamic";

const Page = async () => {
  const lockers = await db.locker.findMany({
    include: {
      lockerRecords: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      member: true,
    },
  });

  return (
    <div>
      <PageHeader label="Lockers" actionUrl="/lockers/new" />
      <DataTable columns={columns} data={lockers} />
    </div>
  );
};

export default Page;
