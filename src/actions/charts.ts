"use server";
import { months } from "@/constants";
import { db } from "@/lib/db";
import { ExpenseVsRevenueChartType } from "@/types";

export const getRevenueVsExpenseChartData = async (year: number = 2025) => {
  const chartData: ExpenseVsRevenueChartType = [];

  const groupByMonth = (records: { createdAt: Date; cost: number }[]) => {
    return records.reduce(
      (total, record) => {
        const month = new Date(record.createdAt).toLocaleString("default", {
          month: "long",
        });

        total[month] = (total[month] || 0) + record.cost;

        return total;
      },
      {} as Record<string, number>,
    );
  };

  const costRecords = await db.costRecord.findMany({
    where: {
      createdAt: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
    },
    select: {
      createdAt: true,
      cost: true,
    },
  });

  const expenses = await db.expense.findMany({
    where: {
      createdAt: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
    },
    select: {
      createdAt: true,
      cost: true,
    },
  });

  const revenueByMonth = groupByMonth(costRecords);
  const expensesByMonth = groupByMonth(expenses);

  for (const month of months) {
    chartData.push({
      month,
      revenue: revenueByMonth[month] || 0,
      expenses: expensesByMonth[month] || 0,
    });
  }

  return chartData;
};
