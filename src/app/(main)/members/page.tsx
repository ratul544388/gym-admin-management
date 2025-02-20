import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { VIEW_PER_PAGE } from "@/constants";
import { db } from "@/lib/db";
import { getSkip } from "@/lib/utils";
import { SearchParamsType, StatusType } from "@/types";
import { Gender, Prisma } from "@prisma/client";
import { columns } from "./_components/table/columns";
import { Metadata } from "next";

const getMembers = async ({
  where,
  skip,
}: {
  where: Prisma.MemberWhereInput;
  skip: number;
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
      createdAt: "desc",
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
  const page = (await searchParams).page || 1;
  const q = (await searchParams).q as string;
  const membershipPlan = (await searchParams).membership_plan as string;
  const gender = (
    (await searchParams).gender as string
  )?.toUpperCase() as Gender;

  const status = (
    (await searchParams).status as string
  )?.toUpperCase() as StatusType;

  const skip = getSkip(page);

  const where: Prisma.MemberWhereInput = {
    ...(gender
      ? {
          ...(gender === "MALE"
            ? {
                gender: "MALE",
              }
            : {
                gender: "FEMALE",
              }),
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
    ...(status === "PENDING"
      ? {
          isMembershipPlanRenewed: false,
          startDate: {
            gt: new Date(),
          },
        }
      : status === "EXPIRED"
      ? {
          endDate: {
            lt: new Date(),
          },
        }
      : status === "ACTIVE"
      ? {
          endDate: {
            gt: new Date(),
          },
        }
      : {}),
  };

  const [members, totalMembers] = await Promise.all([
    getMembers({ where, skip }),
    getTotalMembers(where),
  ]);

  return (
    <div className="space-y-4">
      <PageHeader label="Members" actionUrl="/members/new" />
      <DataTable
        columns={columns}
        data={members}
        pagesDataCount={totalMembers}
        showSearchInput
        searchInputPlaceholder="Search members by Name or ID"
      />
    </div>
  );
}
