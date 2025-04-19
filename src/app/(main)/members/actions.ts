"use server";

import { db } from "@/lib/db";
import { endOfToday, startOfToday } from "date-fns";

export const getMembershipStatusCounts = async () => {
  const [activeCount, pendingCount, expiredCount] = await Promise.all([
    //active
    db.member.count({
      where: {
        startDate: {
          lte: startOfToday(),
        },
        endDate: {
          gt: startOfToday(),
        },
      },
    }),

    //pending
    db.member.count({
      where: {
        isMembershipPlanRenewed: false,
        startDate: {
          gt: startOfToday(),
        },
      },
    }),

    //expired
    db.member.count({
      where: {
        endDate: {
          lt: endOfToday(),
        },
      },
    }),
  ]);

  return { activeCount, pendingCount, expiredCount };
};

export const testAction = async () => {
  const members = await db.member.findMany(); // Fetch all members

  for (const member of members) {
    const startDate = new Date(member.startDate);
    const endDate = new Date(member.endDate);

    // Set both startDate and endDate to the beginning of their respective days
    startDate.setHours(0, 0, 0, 0); // Start date at 00:00:00
    endDate.setHours(0, 0, 0, 0); // End date at 00:00:00

    // Update member with new startDate and endDate
    await db.member.update({
      where: { id: member.id },
      data: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
};
