"use server";

import { adminEmails } from "@/constants";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/is-admin";
import {
  MemberSchema,
  MemberValues,
  RenewMemberSchema,
  RenewMemberValues,
} from "@/validations";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export const createMember = async ({
  values,
  endDate,
  cost,
}: {
  values: MemberValues;
  endDate: Date;
  cost: number;
}) => {
  try {
    MemberSchema.parse(values);

    const user = await currentUser();

    const isAdmin =
      !!user && adminEmails.includes(user.emailAddresses[0].emailAddress);

    if (!isAdmin) {
      return { error: "Unauthorized" };
    }

    await db.member.create({
      data: {
        ...values,
        endDate,
        costRecords: {
          create: {
            cost,
            type: "MEMBERSHIP_PLAN",
          },
        },
      },
    });

    return { success: "Member was created" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        if ((error.meta?.target as string).includes("memberId")) {
          return {
            error: `Member ID already exist`,
          };
        }
      }
    }
    return { error: "Something went wrong" };
  }
};

export const updateMember = async ({
  id,
  values,
}: {
  id: string;
  values: MemberValues;
}) => {
  try {
    const { name, memberId, phone, gender, age, address } =
      MemberSchema.parse(values);

    if (!(await isAdmin())) {
      return { error: "Unauthorized" };
    }

    await db.member.update({
      where: {
        id,
      },
      data: {
        name,
        memberId,
        phone,
        gender,
        age,
        address,
      },
    });

    return { success: "Member Updated" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export const deleteMembers = async (ids: string[]) => {
  try {
    if (!(await isAdmin())) {
      return { error: "Unauthorized" };
    }
    await db.member.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return { success: "Member(s) Deleted" };
  } catch (error) {
    console.log("Error:", error);
    return { error: "Something went wrong" };
  }
};

export const renewMembershipPlan = async ({
  values,
  id,
  cost,
  endDate: endDate,
}: {
  values: RenewMemberValues;
  id: string;
  cost: number;
  endDate: Date;
}) => {
  RenewMemberSchema.parse(values);

  const { membershipPlanId, startDate: startDate } = values;

  try {
    if (!(await isAdmin())) {
      return { error: "Unauthorized" };
    }

    await db.member.update({
      where: {
        id,
      },
      data: {
        membershipPlanId,
        startDate,
        endDate,
        isMembershipPlanRenewed: true,
        costRecords: {
          create: {
            cost,
            type: "RENEW_MEMBERSHIP_PLAN",
          },
        },
      },
    });

    return { success: "Member Renewed" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

// export const searchMembersForLocker = async (q: string) => {
//   const currentUser = await getCurrentUser();

//   if (currentUser?.role !== "ADMIN") {
//     return [];
//   }

//   console.log(q);
//   const members = await db.member.findMany({
//     where: {
//       locker: null,
//       OR: [
//         {
//           memberId: {
//             contains: q,
//           },
//         },
//         {
//           name: {
//             contains: q,
//             mode: "insensitive",
//           },
//         },
//       ],
//     },
//     select: {
//       id: true,
//       name: true,
//       imageUrl: true,
//       phone: true,
//       memberId: true,
//     },
//     take: 10,
//   });

//   return members;
// };
