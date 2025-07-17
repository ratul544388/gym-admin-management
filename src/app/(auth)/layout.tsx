import { AdminAccess } from "@/components/admin-access";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh_+_500px)] justify-center pt-20">
      {children}
      <AdminAccess />
    </div>
  );
}
