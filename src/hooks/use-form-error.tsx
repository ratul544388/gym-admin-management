import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

export const useFormError = () => {
  const [error, setError] = useState<string | undefined>();
  const FormError = ({ className }: { className?: string }) => (
    <div
      style={{ paddingInline: 20 }}
      className={cn(
        "flex justify-center bg-destructive/20 rounded-md items-center gap-3 text-sm font-medium text-center py-2 px-5",
        !error && "hidden",
        className
      )}
    >
      <TriangleAlert
        style={{ height: 24, minWidth: 24 }}
        className="text-destructive"
      />
      {error}
    </div>
  );

  return { FormError, error, setError };
};
