import { PageHeader } from '@/components/page-header'
import React from 'react'
import { ExpenseForm } from '../_components/expense-form'

const NewExpensePage = () => {
  return (
    <div className='space-y-3'>
      <PageHeader label='Add a new Expense' showBackButton/>
      <ExpenseForm/>
    </div>
  )
}

export default NewExpensePage
