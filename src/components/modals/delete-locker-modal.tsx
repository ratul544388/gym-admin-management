import { useModalStore } from "@/hooks/use-modal-store";
import { deleteLocker } from "@/actions/lockers";
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
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

export const DeleteLockerModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDelete = async () => {
    startTransition(() => {
      deleteLocker(data.ids as string[]).then(({ success, error }) => {
        if (success) {
          toast.success(success);
          onClose();
          router.refresh();
          queryClient.invalidateQueries(["availableLockers"] as InvalidateQueryFilters)
        } else {
          toast.error(error);
        }
      });
    });
  };

  return (
    <Dialog
      open={isOpen && type === "deleteLockerModal"}
      onOpenChange={onClose}
    >
      <DialogContent disabled={isPending}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            locker/selected lockers
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5 flex flex-row items-center justify-end gap-4">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleDelete} disabled={isPending}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
