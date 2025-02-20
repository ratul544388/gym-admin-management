import { adminEmails } from "@/constants";
import { currentUser } from "@clerk/nextjs/server";

export const isAdmin = async () => {
  const user = await currentUser();
  return !!user && adminEmails.includes(user?.emailAddresses[0].emailAddress);
};
