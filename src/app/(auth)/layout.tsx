import { Container } from "@/components/container";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Container
      elem="main"
      className="flex h-screen items-center justify-center"
    >
      {children}
    </Container>
  );
}
