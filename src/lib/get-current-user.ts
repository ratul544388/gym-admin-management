import { auth } from "@/auth";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error("Error getting current user", error);
    return null;
  }
})
