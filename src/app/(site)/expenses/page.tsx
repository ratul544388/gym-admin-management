import { DataTable } from '@/components/data-table'
import { PageHeader } from '@/components/page-header'
import React from 'react'
import { columns } from './_components/columns'
import { db } from '@/lib/db'

const ExpensesPage = async () => {
  const expenses = await db.expense.findMany();

  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className='space-y-3'>
      <PageHeader label='Expenses' actionUrl='/expenses/new'/>
      <DataTable columns={columns} data={expenses}/>
    </div>
  )
}

export default ExpensesPage
