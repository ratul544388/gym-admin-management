import { CountUp } from "@/components/count-up";
import { db } from "@/lib/db";
import { cn, formatPrice } from "@/lib/utils";
import {
  endOfMonth,
  endOfToday,
  startOfMonth,
  startOfToday,
  startOfTomorrow,
} from "date-fns";
import { getRevenueVsExpenseChartData } from "../actions";
import { RevenueVsExpenseChart } from "./revenue-vs-expense-chart";

export const DashboardElements = async () => {
  const [
    totalMembers,
    todaysJoinedMembersCount,
    todaysRenewedMembersCount,
    totalRevenue,
    thisMonthRevenue,
    todaysRevenue,
    thisMonthExpenses,
    todaysExpenses,
    revenueVsExpenseChartData,
  ] = await Promise.all([
    // Count total member;
    db.member.count(),

    // Count Todays Joined Members
    db.member.count({
      where: {
        createdAt: {
          gte: startOfToday(),
          lt: startOfTomorrow(),
        },
      },
    }),

    // Count Todays Renewed Members
    db.member.count({
      where: {
        costRecords: {
          some: {
            createdAt: {
              gte: startOfToday(),
            },
            type: "RENEW_MEMBERSHIP_PLAN",
          },
        },
      },
    }),

    // Total revenue
    db.costRecord.aggregate({
      _sum: {
        cost: true,
      },
    }),

    // This Month Revenue
    db.costRecord.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth(startOfToday()),
          lt: endOfMonth(startOfToday()),
        },
      },
      _sum: {
        cost: true,
      },
    }),

    // Todays Revenue
    db.costRecord.aggregate({
      where: {
        createdAt: {
          gte: startOfToday(),
          lt: endOfToday(),
        },
      },
      _sum: {
        cost: true,
      },
    }),

    // This Month Expenses
    db.expense.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth(startOfToday()),
          lt: endOfMonth(startOfToday()),
        },
      },
      _sum: {
        cost: true,
      },
    }),

    // Todays Expenses
    db.expense.aggregate({
      where: {
        createdAt: {
          gte: startOfToday(),
          lt: endOfToday(),
        },
      },
      _sum: {
        cost: true,
      },
    }),

    // Revenew vs expense chart data
    getRevenueVsExpenseChartData(),
  ]);

  const membersData = [
    {
      label: "Total Members",
      value: totalMembers,
    },
    {
      label: "Today's Joined Members",
      value: todaysJoinedMembersCount,
    },
    {
      label: "Today's Renewed Members",
      value: todaysRenewedMembersCount,
    },
  ];

  const revenuesData = [
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue._sum.cost || 0),
    },
    {
      label: "This Month Revenue",
      value: formatPrice(thisMonthRevenue._sum.cost || 0),
    },
    {
      label: "Today's Revenue",
      value: formatPrice(todaysRevenue._sum.cost || 0),
    },
  ];

  const expensesData = [
    {
      label: "This Month Expense",
      value: formatPrice(thisMonthExpenses._sum.cost || 0),
    },
    {
      label: "Today's Expense",
      value: formatPrice(todaysExpenses._sum.cost || 0),
    },
  ];

  return (
    <>
      <ul className="space-y-8">
        <li className="p-5 bg-background shadow rounded-lg dark:shadow-accent">
          <h2 className="font-semibold text-xl">Members</h2>
          <ul className="mt-3 grid xs:grid-cols-2 gap-6 lg:grid-cols-3">
            {membersData.map(({ label, value }) => (
              <li
                key={label}
                className={cn(
                  "rounded-lg dark:shadow-accent-md flex flex-col gap-2 p-5 shadow"
                )}
              >
                <h3 className="text-lg font-semibold">{label}</h3>
                <CountUp value={value} className="text-primary" />
              </li>
            ))}
          </ul>
        </li>
        <li className="p-5 bg-background shadow rounded-lg dark:shadow-accent">
          <h2 className="font-semibold text-xl">Revenues</h2>
          <ul className="mt-3 grid xs:grid-cols-2 gap-6 lg:grid-cols-3">
            {revenuesData.map(({ label, value }) => (
              <li
                key={label}
                className={cn(
                  "rounded-lg dark:shadow-accent-md flex flex-col gap-2 p-5 shadow"
                )}
              >
                <h3 className="text-lg font-semibold">{label}</h3>
                <CountUp value={value} className="text-green-500" />
              </li>
            ))}
          </ul>
        </li>
        <li className="p-5 bg-background shadow rounded-lg dark:shadow-accent">
          <h2 className="font-semibold text-xl">Expenses</h2>
          <ul className="mt-3 grid xs:grid-cols-2 gap-6 lg:grid-cols-3">
            {expensesData.map(({ label, value }) => (
              <li
                key={label}
                className={cn(
                  "rounded-lg dark:shadow-accent-md flex flex-col gap-2 p-5 shadow"
                )}
              >
                <h3 className="text-lg font-semibold">{label}</h3>
                <CountUp value={value} className="text-red-500" />
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <RevenueVsExpenseChart chartData={revenueVsExpenseChartData} />
    </>
  );
};
