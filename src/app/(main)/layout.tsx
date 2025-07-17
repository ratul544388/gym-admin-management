import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { MobileBottomMenu } from "@/components/mobile-bottom-menu";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <Header />
      <main className="flex">
        <Sidebar />
        <Container className="pb-20 xs:pl-[80px] sm:pl-[80px] md:pl-[276px]">
          {children}
        </Container>
        <MobileBottomMenu />
      </main>
      <Toaster />
    </QueryProvider>
  );
}
