import { Container } from "@/components/container";
import { Header } from "@/components/header";
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
    <>
      <Header />
      <Container elem="main" className="px-4 pb-20 md:pl-[264px]">
        <DesktopSidebar />
        {children}
      </Container>
    </>
  );
}
