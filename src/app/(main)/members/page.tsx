import { DataTable } from "@/components/data-table";
import { PageLoader } from "@/components/loaders/page-loader";
import { PageHeader } from "@/components/page-header";
import { VIEW_PER_PAGE } from "@/constants";
import { db } from "@/lib/db";
import { getSkip } from "@/lib/utils";
import { Orderby, SearchParamsType, StatusType } from "@/types";
import { Gender, Prisma } from "@prisma/client";
import { endOfToday, startOfToday } from "date-fns";
import { Metadata } from "next";
import { Fragment, Suspense } from "react";
import { columns } from "./_components/table/columns";

const getMembers = async ({
  where,
  skip,
  orderby,
}: {
  where: Prisma.MemberWhereInput;
  skip: number;
  orderby: Orderby;
}) => {
  const members = await db.member.findMany({
    where,
    include: {
      membershipPlan: {
        select: {
          name: true,
        },
      },
    },
    take: VIEW_PER_PAGE,
    skip,
    orderBy: {
      ...(orderby
        ? {
            ...(orderby === "desc"
              ? {
                  endDate: "desc",
                }
              : {
                  endDate: "asc",
                }),
          }
        : {
            createdAt: "desc",
          }),
    },
  });

  return members;
};

const getTotalMembers = async (where: Prisma.MemberWhereInput) => {
  const totalMembers = await db.member.count({
    where,
  });
  return totalMembers;
};

export const generateMetadata = (): Metadata => {
  return {
    title: "Members",
  };
};

export default async function MembersPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  return (
    <>
      <PageHeader label="Members" actionUrl="/members/new" />
      <Suspense fallback={<PageLoader />}>
        <MembersDataTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const MembersDataTable = async ({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) => {
  const {
    page = 1,
    q,
    membership_plan: membershipPlan,
    gender: rowGender,
    status: rowStatus,
    orderby: rowOrderby,
  } = await searchParams;

  const gender = rowGender?.toUpperCase() as Gender;
  const status = rowStatus?.toUpperCase() as StatusType;
  const orderby = rowOrderby as Orderby;

  const skip = getSkip(page);

  const todayStart = startOfToday();
  const todayEnd = endOfToday();
  const where: Prisma.MemberWhereInput = {
    ...(gender
      ? {
          gender: gender === "MALE" ? "MALE" : "FEMALE",
        }
      : {}),

    ...(q
      ? {
          OR: [
            {
              ...(!isNaN(parseInt(q))
                ? {
                    memberId: parseInt(q),
                  }
                : {}),
            },
            {
              name: {
                contains: q,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),

    ...(membershipPlan
      ? {
          membershipPlan: {
            name: {
              contains: membershipPlan,
              mode: "insensitive",
            },
          },
        }
      : {}),

    ...(status
      ? status === "ACTIVE"
        ? {
            startDate: {
              lte: todayEnd,
            },
            endDate: {
              gte: todayStart,
            },
          }
        : status === "PENDING"
        ? {
            isMembershipPlanRenewed: false,
            startDate: {
              gt: todayEnd,
            },
          }
        : status === "EXPIRED"
        ? {
            endDate: {
              lt: todayStart,
            },
          }
        : {}
      : {}),
  };

  const [members, totalMembers] = await Promise.all([
    getMembers({ where, skip, orderby }),
    getTotalMembers(where),
  ]);

  return (
    <DataTable
      columns={columns}
      data={members}
      pagesDataCount={totalMembers}
      showSearchInput
      searchInputPlaceholder="Search members by Name or ID"
      orderbyFilter
    />
  );
};
