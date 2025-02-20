"use server";

import { db } from "@/lib/db";
import { MembershipPlanSchema, MembershipPlanValues } from "@/validations";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import * as z from "zod";

export const getMembershipPlanNames = async () => {
  const membershipPlanNames = await db.membershipPlan.findMany({
    select: {
      name: true,
    },
  });

  return membershipPlanNames;
};

export const getMembershipPlans = async () => {
  const membershipPlans = await db.membershipPlan.findMany({
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  return membershipPlans;
};

export const createMembershipPlan = async (values: MembershipPlanValues) => {
  try {
    MembershipPlanSchema.parse(values);
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthenticated" };
    }

    await db.membershipPlan.create({
      data: values,
    });

    return { success: "Membership Plan created" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const field = (error.meta?.target as string).split("_")[1];
        return {
          error: `Membership plan ${field} already exist`,
        };
      }
    }
    console.error("Database error:", error);
    return { error: "Something went wrong" };
  }
};

export const updateMembershipPlan = async ({
  values,
  membershipPlanId,
}: {
  values: z.infer<typeof MembershipPlanSchema>;
  membershipPlanId: string;
}) => {
  try {
    const validatedFields = MembershipPlanSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    await db.membershipPlan.update({
      where: {
        id: membershipPlanId,
      },
      data: values,
    });

    return { success: "Membership Plan Updated" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const field = (error.meta?.target as string).split("_")[1];
        return {
          error: `Membership plan ${field} already exist`,
        };
      }
    }
    console.error("Database error:", error);
    return { error: "Something went wrong" };
  }
};

export const deleteMembershipPlans = async (ids: string[]) => {
  try {
    const memberExist = await db.membershipPlan.findFirst({
      where: {
        members: {
          some: {
            membershipPlanId: {
              in: ids,
            },
          },
        },
      },
    });

    if (memberExist) {
      return {
        error:
          "Unable to proceed: The selected Membership Plan has associated members. Please reassign or remove these members before attempting this action.",
      };
    }

    await db.membershipPlan.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return { success: "Membership Plan Deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
