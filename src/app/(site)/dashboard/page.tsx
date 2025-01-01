import { PageHeader } from "@/components/page-header";
import { today } from "@/constants";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { endOfMonth, startOfMonth } from "date-fns";
import { RevenueVsExpenseChart } from "./_components/revenue-vs-expense-chart";
import { getRevenueVsExpenseChartData } from "@/actions/charts";

const DashboardPage = async () => {
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
        costRecords: {
          some: {
            createdAt: today,
          },
        },
      },
    }),
    db.member.count({
      where: {
        costRecords: {
          some: {
            createdAt: today,
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
      className: "",
    },
    {
      label: "Today's Joined Members",
      value: todaysJoinedMembersCount,
      className: "",
    },
    {
      label: "Today's Renewed Members",
      value: todaysRenewedMembersCount,
      className: "",
    },
    {
      label: "Total Revenue",
      value: `${totalRevenue._sum.cost || 0}/-`,
      className: "",
    },
    {
      label: "This Month Revenue",
      value: `${thisMonthRevenue._sum.cost || 0}/-`,
      className: "",
    },
    {
      label: "This Month Expense",
      value: `${thisMonthExpense._sum.cost || 0}/-`,
      className: "",
    },
  ];

  return (
    <>
      <PageHeader label="Dashboard" />
      <ul className="mt-5 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {data.map(({ label, value, className }) => (
          <li
            key={label}
            className={cn("rounded-md bg-background p-5 shadow-md", className)}
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
