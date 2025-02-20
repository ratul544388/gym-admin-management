import NotFound from '@/app/not-found';
import { ExpenseForm } from '@/app/(main)/expenses/_components/expense-form';
import { PageHeader } from '@/components/page-header'
import { db } from '@/lib/db';
import { ParamsType } from '@/types'
import { isValidObjectId } from 'mongoose';
import React from 'react'

const EditExpensePage = async ({params} : {params: ParamsType}) => {
  const {id} = await params;
  if(!isValidObjectId(id)) {
    return <NotFound/>
  }
  const expense = await db.expense.findUnique({
    where: {
      id
    }
  })

  if(!expense) {
    return <NotFound/>
  }
  return (
    <div className='space-y-6'>
      <PageHeader label='Edit expense' backButtonUrl='/expenses'/>
      <ExpenseForm expense={expense}/>
    </div>
  )
}

export default EditExpensePage
