"use client";

import { setDefaultAdmissionFee } from "@/actions/default";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_ADMISSION_FEE } from "@/constants";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface AddmissionFeeFormProps {
  admissionFee?: number;
}

export const AddmissionFeeForm = ({
  admissionFee = DEFAULT_ADMISSION_FEE,
}: AddmissionFeeFormProps) => {
  const [value, setValue] = useState<string>(String(admissionFee));
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      setDefaultAdmissionFee(Number(value)).then(({ success, error }) => {
        if (success) {
          toast.error(success);
        } else {
          toast.error(error);
        }
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      Admission Fee
      <Input
        disabled={isPending}
        type="number"
        className="ml-auto w-32"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button disabled={isPending || !value} className="ml-4">
        Save
      </Button>
    </form>
  );
};
