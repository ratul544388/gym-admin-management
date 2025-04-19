"use client";

import { useUser } from "@clerk/nextjs";
import { Container } from "./container";
import { CopyButton } from "./copy-button";
import { Separator } from "./ui/separator";

const EMAIL = "admin@admin.com";
const PASSWORD = "Jv9!xQ2@rL8#zmWp";

export const AdminAccess = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (isSignedIn || !isLoaded) return;

  return (
    <div className="fixed bottom-0 bg-primary inset-x-0 py-5">
      <Container className="text-white flex flex-col items-center justify-center">
        <p className="text-center">
          Only admin can access the dashboard! For testing purpose you can have
          admin access with the following email and password
        </p>
        <Separator className="my-3" />
        <div className="flex items-center gap-1">
          <p>
            <span className="font-bold">Email:</span> {EMAIL}
          </p>
          <CopyButton text={EMAIL} />
        </div>
        <div className="flex items-center gap-1">
          <p>
            <span className="font-bold">Password:</span> {PASSWORD}
          </p>
          <CopyButton text={PASSWORD} />
        </div>
      </Container>
    </div>
  );
};
