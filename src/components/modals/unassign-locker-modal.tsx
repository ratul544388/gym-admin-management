import { useModalStore } from "@/hooks/use-modal-store";
import { unassignLocker } from "@/actions/lockers";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const UnassignLockerModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async () => {
    startTransition(() => {
      unassignLocker(data.id as string).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          onClose();
          router.refresh();
        } else {
          toast.error(error);
        }
      });
    });
  };

  return (
    <Dialog
      open={isOpen && type === "unassignLockerModal"}
      onOpenChange={onClose}
    >
      <DialogContent disabled={isPending}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will unassign the member from
            locker
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5 flex flex-row items-center justify-end gap-4">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
