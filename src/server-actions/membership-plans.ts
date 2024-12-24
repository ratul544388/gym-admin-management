"use server";

import { db } from "@/lib/db";
import { membershipPlanSchema } from "@/schemas";
import * as z from "zod";

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

export const createMembershipPlan = async (
  values: z.infer<typeof membershipPlanSchema>,
) => {
  try {
    const { name, durationInMonth, price } = values;
    const existingField = await db.membershipPlan.findFirst({
      where: {
        OR: [
          {
            name: {
              equals: name,
              mode: "insensitive",
            },
          },
          {
            durationInMonth,
          },
          {
            price,
          },
        ],
      },
    });

    if(existingField) {
      return { error: "Membership Plan already exists" };
    }

    const validatedFields = membershipPlanSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    await db.membershipPlan.create({
      data: values,
    });

    return { success: "Membership Plan created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateMembershipPlan = async ({
  values,
  membershipPlanId,
}: {
  values: z.infer<typeof membershipPlanSchema>;
  membershipPlanId: string;
}) => {
  try {
    const validatedFields = membershipPlanSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    await db.membershipPlan.update({
      where: {
        id: membershipPlanId,
      },
      data: values,
    });

    return { success: "Membership Plan created" };
  } catch (error) {
    console.log(error);
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
