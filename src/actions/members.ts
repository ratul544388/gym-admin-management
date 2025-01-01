"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { createMemberSchema, renewMemberSchema, updateMemberSchema } from "@/schemas";
import * as z from "zod";

export const createMember = async ({
  values,
  membershipPlanEndDate,
  totalCost,
  lockerEndDate,
  lockerCost,
}: {
  values: z.infer<typeof createMemberSchema>;
  membershipPlanEndDate: Date;
  totalCost: number;
  lockerEndDate?: Date;
  lockerCost?: number;
}) => {
  try {
    const validatedFields = createMemberSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const {
      membershipPlanId,
      membershipPlanStartDate,
      name,
      address,
      gender,
      lockerStartDate,
      phone,
      memberId,
      lockerId,
      age,
      imageUrl,
    } = values;

    const currentUser = await getCurrentUser();

    if (currentUser?.role !== "ADMIN") {
      return { error: "Unauthorized" };
    }

    const existingMemberId = await db.member.findUnique({
      where: {
        memberId,
      },
    });

    if (existingMemberId) {
      return { error: "Member with same ID already exists" };
    }

    const membershipPlanCost = totalCost - (lockerCost || 0);

    await db.member.create({
      data: {
        memberId,
        name,
        address,
        age,
        gender,
        phone,
        membershipPlanStartDate,
        membershipPlanId,
        imageUrl,
        membershipPlanEndDate,
        lockerEndDate,
        costRecords: {
          create: {
            cost: membershipPlanCost,
            type: "MEMBERSHIP_PLAN",
          },
        },
        ...(lockerId && lockerCost
          ? {
              lockerId,
              lockerStartDate,
              costRecords: {
                create: {
                  type: "LOCKER",
                  cost: lockerCost,
                },
              },
            }
          : {}),
      },
    });

    return { success: "Member was created" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export const updateMember = async ({
  id,
  values,
}: {
  id: string;
  values: z.infer<typeof updateMemberSchema>;
}) => {
  try {
    const validatedFields = updateMemberSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const currentUser = await getCurrentUser();

    if (currentUser?.role !== "ADMIN") {
      return { error: "Unauthorized" };
    }

    await db.member.update({
      where: {
        id,
      },
      data: values,
    });

    return { success: "Member Updated" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export const deleteMembers = async (ids: string[]) => {
  try {
    const currentUser = await getCurrentUser();

    if (currentUser?.role !== "ADMIN") {
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
  endDate: membershipPlanEndDate,
}: {
  values: z.infer<typeof renewMemberSchema>;
  id: string;
  cost: number;
  endDate: Date;
}) => {
  const validatedFields = renewMemberSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { membershipPlanId, startDate: membershipPlanStartDate } = values;

  try {
    const currentUser = await getCurrentUser();

    if (currentUser?.role !== "ADMIN") {
      return { error: "Unauthorized" };
    }

    await db.member.update({
      where: {
        id,
      },
      data: {
        membershipPlanId,
        membershipPlanStartDate,
        membershipPlanEndDate,
        isMembershipPlanRenewed: true,
        costRecords: {
          create: {
            cost,
            type: "MEMBERSHIP_PLAN",
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

export const searchMembersForLocker = async (q: string) => {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "ADMIN") {
    return [];
  }

  console.log(q);
  const members = await db.member.findMany({
    where: {
      locker: null,
      OR: [
        {
          memberId: {
            contains: q,
          },
        },
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      phone: true,
      memberId: true,
    },
    take: 10,
  });

  return members;
};
