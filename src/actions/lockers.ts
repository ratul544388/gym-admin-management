"use server";

import { db } from "@/lib/db";
import { assignLockerSchema, lockerSchema } from "@/schemas";
import * as z from "zod";

export const getAvailableLockers = async () => {
  const lockers = await db.locker.findMany({
    where: {
      members: {
        none: {},
      },
    },
  });
  return lockers;
};

// const checkAdmin = async () => {
//   const currentUser = await getCurrentUser();
//   if(!currentUser || currentUser.role !== "ADMIN"){
//     console.log("This is triggred")
//     throw new Error("You are not authorized to perform this action");
//   }
// }

export const createLocker = async (values: z.infer<typeof lockerSchema>) => {
  try {
    const validatedFields = lockerSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    // await checkAdmin();

    await db.locker.create({
      data: values,
    });

    return { success: "Locker Created" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const updateLocker = async ({
  values,
  lockerId,
}: {
  values: z.infer<typeof lockerSchema>;
  lockerId: string;
}) => {
  try {
    const validatedFields = lockerSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    await db.locker.update({
      where: {
        id: lockerId,
      },
      data: values,
    });

    return { success: "Locker Updated" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteLocker = async (ids: string[]) => {
  try {
    await db.locker.deleteMany({
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

export const assignLocker = async ({
  values,
  cost,
  endDate: lockerEndDate,
  isRenew,
}: {
  values: z.infer<typeof assignLockerSchema>;
  cost: number;
  endDate: Date;
  isRenew?: boolean;
}) => {
  try {
    const validatedFields = assignLockerSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { memberId, startDate: lockerStartDate, lockerId } = values;

    await db.member.update({
      where: {
        id: memberId,
      },
      data: {
        lockerId,
        lockerStartDate,
        lockerEndDate,
        isLockerRenewed: isRenew,
        costRecords: {
          create: {
            cost,
            type: "LOCKER",
          },
        },
      },
    });

    return { success: "Locker Assinged" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const unassignLocker = async (memberId: string) => {
  try {
    await db.member.update({
      where: {
        id: memberId,
      },
      data: {
        lockerId: null,
        lockerStartDate: null,
        lockerEndDate: null,
      },
    });

    return { success: "Locker Unassigned" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
