import { PageHeader } from '@/components/page-header';
import { LockerForm } from '../_components/locker-form';

const AddNewMemberPage = async () => {
  return (
    <div className='space-y-3'>
      <PageHeader label='Add a new Locker' showBackButton/>
      <LockerForm />
    </div>
  )
}

export default AddNewMemberPage
