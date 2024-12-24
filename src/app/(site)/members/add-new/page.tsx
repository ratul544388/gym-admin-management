import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import Test from "./test";

const AddNewMemberPage = () => {
  return (
    <div className="space-y-3">
      <PageHeader label="Add a new Member" showBackButton />
      <Separator />
      <Test/>
    </div>
  );
};

export default AddNewMemberPage;
