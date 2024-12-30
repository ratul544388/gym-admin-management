"use client";

import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

const Page = () => {
  const currentUser = useCurrentUser();
  return (
    <Container
      elem="main"
      className="flex h-[calc(100vh_-_65px)] items-center justify-center pb-14"
    >
      {currentUser?.role === "ADMIN" ? (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold">
            Welcome back{" "}
            <span className="bg-gradient bg-clip-text text-transparent">
              {currentUser.name || "User"}
            </span>
          </h2>
          <Link href="/dashboard" className={buttonVariants()}>
            Go to Dashbaord
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl font-semibold">
            Welcome to{" "}
            <span className="bg-gradient bg-clip-text text-transparent">
              EFS
            </span>
          </h2>
          {currentUser?.role === "USER" ? (
            <p className="text-sm text-muted-foreground">
              Only Admin can access to the Dashboard
            </p>
          ) : (
            <Link href="/login" className={buttonVariants()}>
              Login
            </Link>
          )}
        </div>
      )}
    </Container>
  );
};

export default Page;
