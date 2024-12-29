import { PageHeader } from '@/components/page-header'
import { MembershipPlanForm } from '../_components/membership-plan-form'

const page = () => {
  return (
    <div className='space-y-3'>
      <PageHeader label='Create a new Membership Plan' showBackButton/>
      <MembershipPlanForm />
    </div>
  )
}

export default page
