import { Container } from "@/components/container";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser?.role === "ADMIN") {
    redirect("/dashboard");
  } else if (currentUser?.role === "USER") {
    redirect("/");
  }
  
  return (
    <Container
      elem="main"
      className="min-h-[calc(100vh_-_65px)] flex items-center justify-center"
    >
      {children}
    </Container>
  );
}