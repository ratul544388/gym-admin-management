"use client";
import { googleLogin } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const GoogleLoginButton = () => {
  const handleClick = async () => {
    await googleLogin();
  };
  return (
    <Button
      type="button"
      onClick={handleClick}
      variant="outline"
      className="space-x-3"
    >
      <FcGoogle className="size-5" />
      Continue with Google
    </Button>
  );
};
