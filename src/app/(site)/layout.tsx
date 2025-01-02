import { Container } from "@/components/container";
import { DesktopSidebar } from "@/components/sidebars/desktop-sidebar";
import { ReactNode } from "react";

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {

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
