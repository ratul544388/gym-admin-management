import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { cn, formatPrice } from "@/lib/utils";
import { endOfMonth, startOfMonth } from "date-fns";
import { getRevenueVsExpenseChartData } from "@/actions/charts";
import { RevenueVsExpenseChart } from "./revenue-vs-expense-chart";

const DashboardPage = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalMembers,
    todaysJoinedMembersCount,
    todaysRenewedMembersCount,
    totalRevenue,
    thisMonthRevenue,
    thisMonthExpense,
    revenueVsExpenseChartData,
  ] = await Promise.all([
    db.member.count(),
    db.member.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    }),
    db.member.count({
      where: {
        costRecords: {
          some: {
            createdAt: today,
            type: "RENEW_MEMBERSHIP_PLAN",
          },
        },
      },
    }),
    db.costRecord.aggregate({
      _sum: {
        cost: true,
      },
    }),
    db.costRecord.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth(today),
          lte: endOfMonth(today),
        },
      },
      _sum: {
        cost: true,
      },
    }),
    db.expense.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth(today),
          lte: endOfMonth(today),
        },
      },
      _sum: {
        cost: true,
      },
    }),
    getRevenueVsExpenseChartData(),
  ]);

  const data = [
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
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue._sum.cost || 0),
    },
    {
      label: "This Month Revenue",
      value: formatPrice(thisMonthRevenue._sum.cost || 0),
    },
    {
      label: "This Month Expense",
      value: formatPrice(thisMonthExpense._sum.cost || 0),
    },
  ];

  return (
    <>
      <PageHeader label="Dashboard" />
      <ul className="mt-5 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {data.map(({ label, value }) => (
          <li
            key={label}
            className={cn("rounded-md border bg-background p-5 shadow")}
          >
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="text-2xl font-semibold text-primary">{value}</p>
          </li>
        ))}
      </ul>
      <RevenueVsExpenseChart chartData={revenueVsExpenseChartData} />
    </>
  );
};

export default DashboardPage;
