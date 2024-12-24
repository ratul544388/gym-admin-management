import { PageHeader } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { LockerForm } from '../_components/locker-form';

const AddNewMemberPage = async () => {
  return (
    <div className='space-y-3'>
      <PageHeader label='Add a new Locker' showBackButton/>
      <Separator/>
      <LockerForm />
    </div>
  )
}

export default AddNewMemberPage
