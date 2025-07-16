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
    <div className="fixed inset-x-0 bottom-0 bg-primary py-5">
      <Container className="flex flex-col items-center justify-center text-white">
        <p className="text-center">
          Only admin can access the dashboard! The main website is for the
          client is deployed in another server. This is for showcase. To get
          admin access please enter the following Email and Password
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
