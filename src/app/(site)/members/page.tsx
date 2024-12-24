import { DataTable } from "@/app/(site)/members/_components/data-table";
import { PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { db } from "@/lib/db";
import { SearchParamsType, StatusType } from "@/types";
import { Gender, Prisma } from "@prisma/client";
import { columns } from "./_components/columns";
import { Suspense } from "react";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const page = Number((await searchParams).page) || 1;
  const membershipPlan = (await searchParams).membership_plan as string;
  const gender = (
    (await searchParams).gender as string
  )?.toUpperCase() as Gender;

  const status = (
    (await searchParams).status as string
  )?.toUpperCase() as StatusType;

  const VIEW_PER_PAGE = 1;

  const skip = (page - 1) * VIEW_PER_PAGE;

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
              startDate: {
                lt: new Date(),
              },
              endDate: {
                gt: new Date(),
              },
            }
          : {}),
  };

  const totalMembers = await db.member.count({ where });
  const totalPages = totalMembers / VIEW_PER_PAGE;

  const members = await db.member.findMany({
    where,
    include: {
      membershipPlan: {
        include: {
          membershipRecords: {
            orderBy: {
              createdAt: "desc",
            },
            take: 2,
          },
        },
      },
      locker: {
        include: {
          lockerRecords: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      },
    },
    take: VIEW_PER_PAGE,
    skip,
  });

  return (
    <div>
      <PageHeader label="Members" actionUrl="/members/add-new" />
      <Suspense fallback={"Loading...."}>
        <DataTable columns={columns} data={members} />
      </Suspense>
      <Pagination maxPages={totalPages} className="mt-3" />
    </div>
  );
}
