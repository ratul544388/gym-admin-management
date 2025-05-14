import { Container } from "@/components/container";
import { Header } from "@/components/header";
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
        <Container className="pb-20 lg:pl-[284px]">{children}</Container>
      </main>
      <Toaster />
    </QueryProvider>
  );
}
