import { Container } from "@/components/container";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  
  return (
    <Container
      elem="main"
      className="min-h-[calc(100vh_-_65px)] flex items-center justify-center"
    >
      {children}
    </Container>
  );
}
