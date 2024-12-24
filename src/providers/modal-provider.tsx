"use client";
import { DeleteLockerModal } from "@/components/modals/delete-locker-modal";
import { DeleteMemberModal } from "@/components/modals/delete-member-modal";
import { DeleteMembershipPlanModal } from "@/components/modals/delete-membership-plan-modal";
import { useEffect, useState } from "react";
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteMemberModal/>
      <DeleteMembershipPlanModal/>
      <DeleteLockerModal/>
    </>
  );
};