import { getCurrentUser } from "./get-current-user";

export const isAdmin = async () => {
  const currentUser = await getCurrentUser();

  return currentUser?.role === "ADMIN";
};
