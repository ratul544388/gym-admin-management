import { AdminAccess } from "@/components/admin-access";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center py-20">
      {children}
      <AdminAccess />
    </div>
  );
}
