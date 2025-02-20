import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { useFormError } from "./use-form-error";

interface WarningModalProps {
  onDelete: () => Promise<{ success?: string; error?: string }>;
  title: string;
  description?: string;
  onSuccess?: () => void;
}

export const useWarningModal = ({
  onDelete,
  title,
  description = "This action cannot be undone!!!",
  onSuccess,
}: WarningModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { setError, FormError } = useFormError();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const WarningModal = useMemo(() => {
    const handleSubmit = () => {
      startTransition(async () => {
        const { success, error } = await onDelete();
        if (success) {
          toast.success(success);
          setOpenModal(false);
          setError(undefined);
          router.refresh();
          onSuccess?.();
        } else {
          setError(error);
        }
      });
    };

    const handleClose = () => {
      if (isPending) return;
      setOpenModal(false);
    };

    return (
      <Dialog open={openModal} onOpenChange={handleClose}>
        <DialogContent className="p-0">
          <DialogHeader className="p-5">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-destructive">
              {description}
            </DialogDescription>
          </DialogHeader>
          <FormError />
          <DialogFooter className="bg-destructive/20 p-5 rounded-t-xl">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleSubmit}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }, [
    FormError,
    description,
    isPending,
    onDelete,
    onSuccess,
    openModal,
    router,
    setError,
    title,
  ]);

  return { WarningModal, openModal, setOpenModal };
};
