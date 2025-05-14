import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-8xl font-extrabold">Opps!</h1>
      <h2 className="mt-6 text-xl font-bold">404 - PAGE NOT FOUND</h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        We couldn&apos;t find the page you requested. It might be unavailable or
        the URL might be incorrect.
      </p>
      <Link href={"/dashboard"} className={cn(buttonVariants(), "mt-5")}>
        Go back to dashboard
      </Link>
    </div>
  );
};

export default NotFound;
