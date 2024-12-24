"use server";

import { db } from "@/lib/db";
import { memberSchema, renewMemberSchema } from "@/schemas";
import * as z from "zod";

export const createMember = async ({
  values,
  totalCost,
  endDate,
  lockerId,
  lockerStartDate,
  lockerEndDate,
  lockerCost,
}: {
  values: z.infer<typeof memberSchema>;
  totalCost: number;
  endDate: Date;
  lockerId?: string;
  lockerStartDate?: Date;
  lockerEndDate?: Date;
  lockerCost?: number;
}) => {
  try {
    const validatedFields = memberSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const {
      name,
      memberId,
      phone,
      gender,
      address,
      startDate,
      membershipPlanId,
    } = values;

    const existingMemberId = await db.member.findUnique({
      where: {
        memberId,
      },
    });

    if (existingMemberId) {
      return { error: "Member with same ID already exists" };
    }

    await db.member.create({
      data: {
        memberId,
        name,
        phone,
        gender,
        address,
        membershipPlanId,
        membershipRecords: {
          create: {
            cost: totalCost,
            startDate,
            endDate,
            membershipPlanId,
          },
        },
        ...(lockerId && lockerCost && lockerStartDate && lockerEndDate
          ? {
              lockerId,
              lockerRecords: {
                create: {
                  lockerId,
                  cost: lockerCost,
                  startDate: lockerStartDate,
                  endDate: lockerEndDate,
                },
              },
            }
          : {}),
      },
    });

    return { success: "Member was created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateMember = async ({
  id,
  totalCost,
  endDate,
  values,
  // lockerId,
  // lockerCost,
  // lockerStartDate,
  // lockerEndDate,
}: {
  id: string;
  values: z.infer<typeof memberSchema>;
  totalCost: number;
  endDate: Date;
  lockerId?: string;
  lockerCost?: number;
  lockerStartDate?: Date;
  lockerEndDate?: Date;
}) => {
  try {
    const validatedFields = memberSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const {
      name,
      memberId,
      phone,
      gender,
      address,
      startDate,
      membershipPlanId,
    } = values;

    await db.member.update({
      where: {
        id,
      },
      data: {
        memberId,
        name,
        phone,
        gender,
        address,
        membershipPlanId,
        membershipRecords: {
          update: {
            where: {
              id: "",
            },
            data: {},
          },
        },
      },
    });

    const lastMembershipRecord = await db.membershipRecord.findFirst({
      where: {
        memberId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!lastMembershipRecord) {
      return { error: "Membership record not found" };
    }

    await db.membershipRecord.update({
      where: {
        id: lastMembershipRecord.id,
      },
      data: {
        cost: totalCost,
        startDate,
        endDate,
        membershipPlanId,
      },
    });

    return { success: "Member Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteMembers = async (ids: string[]) => {
  try {
    await db.member.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return { success: "Member Deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const renewMember = async ({
  values,
  id,
  payingAmount,
  endDate,
}: {
  values: z.infer<typeof renewMemberSchema>;
  id: string;
  payingAmount: number;
  endDate: Date;
}) => {
  const validatedFields = renewMemberSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { membershipPlanId, startDate } = values;

  console.log({ startDate, endDate, membershipPlanId, payingAmount, id });

  try {
    await db.member.update({
      where: {
        id,
      },
      data: {
        membershipPlanId,
        membershipRecords: {
          create: {
            startDate,
            endDate,
            cost: payingAmount,
            membershipPlanId,
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
