import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { placeholderImage } from "@/constants";
import { db } from "@/lib/db";
import { cn, formatDate } from "@/lib/utils";
import { ParamsType } from "@/types";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const MemberProfilePage = async ({ params }: { params: ParamsType }) => {
  const { id } = await params;
  const member = await db.member.findUnique({
    where: { id },
    include: {
      locker: {
        select: {
          lockerNo: true,
        },
      },
      membershipPlan: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!member) {
    notFound();
  }

  const {
    name,
    phone,
    address,
    age,
    gender,
    imageUrl,
    createdAt,
    lockerId,
    membershipPlanStartDate,
    membershipPlanEndDate,
  } = member;

  const data = {
    name,
    phone,
    gender,
    address,
    age,
    locker_No: !!lockerId,
    createdAt: formatDate({ date: createdAt }),
    membership_Plan: member.membershipPlan.name,
    membership_plan_starts: formatDate({ date: membershipPlanStartDate }),
    expire_date: formatDate({ date: membershipPlanEndDate }),
  };

  return (
    <div className="space-y-3">
      <PageHeader label="Member's Profile" showBackButton />
      <div className="rounded-lg border border-dashed bg-background p-5 shadow-md">
        <div className="flex justify-between">
          <div className="relative size-48">
            <Image
              src={imageUrl || placeholderImage}
              alt="Avatar"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <Link
            href={`/members/${member.id}/edit`}
            className={buttonVariants({ variant: "outline" })}
          >
            <Edit className="size-4" />
            Edit
          </Link>
        </div>
        <ul className="mt-5">
          {Object.entries(data).map(([key, value]) => (
            <li
              key={key}
              className="flex justify-between rounded-sm px-3 py-2 odd:bg-accent"
            >
              <p className="capitalize">{String(key).replace(/_/g, " ")}</p>
              <p
                className={cn("capitalize", !value && "text-muted-foreground")}
              >
                {value || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberProfilePage;
