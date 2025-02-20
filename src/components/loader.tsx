import { Loader2Icon } from "lucide-react";

export const Loader = () => {
  return (
     <div className="h-[calc(100vh_-_150px)] flex items-center justify-center">
        <Loader2Icon className="size-10 text-primary animate-spin"/>
     </div>
    );
}
