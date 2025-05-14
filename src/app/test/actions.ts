"use server";

import { db } from "@/lib/db";

export const updateAllMembers = async () => {
  const members = await db.member.findMany();

  await Promise.all(
    members.map(async (member) => {
      const existingEndDate = new Date(member.endDate);

      existingEndDate.setHours(23, 59, 59, 999);

      await db.member.update({
        where: {
          id: member.id,
        },
        data: {
          endDate: existingEndDate,
        },
      });
    })
  );
};
