import { useModalStore } from "@/hooks/use-modal-store";
import { deleteMembers } from "@/server-actions/members";
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

export const DeleteMemberModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    startTransition(() => {
      deleteMembers(data.ids as string[]).then(({ success, error }) => {
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
      open={isOpen && type === "deleteMemberModal"}
      onOpenChange={onClose}
    >
      <DialogContent disabled={isPending}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            member/selected members
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
