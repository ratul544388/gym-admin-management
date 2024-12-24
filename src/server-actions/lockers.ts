"use server";

import { db } from "@/lib/db";
import { asignLockerToMemberSchema, lockerSchema } from "@/schemas";
import * as z from "zod";

export const getLocker = async () => {
  const lockers = await db.locker.findMany({});
  return lockers;
};

export const createLocker = async (values: z.infer<typeof lockerSchema>) => {
  try {
    const validatedFields = lockerSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

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

    return { success: "Membership Plan created" };
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

export const asignLockerToMember = async ({
  values,
  memberId,
  cost,
  endDate,
}: {
  values: z.infer<typeof asignLockerToMemberSchema>;
  memberId: string;
  cost: number;
  endDate: Date;
}) => {
  try {
    const validatedFields = asignLockerToMemberSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { lockerId, startDate } = values;

    await db.member.update({
      where: {
        id: memberId,
      },
      data: {
        locker: {
          connect: {
            id: lockerId,
          },
        },
        lockerRecords: {
          create: {
            lockerId,
            startDate,
            endDate,
            cost,
          },
        },
      },
    });

    return { success: "Locker Assinged to the member" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
