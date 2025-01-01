import { DataTable } from "@/components/data-table";
import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import React from "react";
import { columns } from "./_components/columns";

const UsersPage = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      role: true,
      email: true,
    },
  });
  return (
    <div className="space-y-3">
      <PageHeader label="Users" showBackButton />
      <DataTable
        columns={columns}
        data={users}
        showSearchInput
        searchInputPlaceholder="Search users by Name or Email"
      />
    </div>
  );
};

export default UsersPage;
