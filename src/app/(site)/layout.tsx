import { Container } from "@/components/container";
import { DesktopSidebar } from "@/components/sidebars/desktop-sidebar";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <Container
      elem="main"
      className="min-h-offset-screen px-3 pb-14 md:pl-[264px]"
    >
      <DesktopSidebar />
      {children}
    </Container>
  );
}
