import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/get-current-user";

const DashboardPage = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <Button>Sign Out</Button>
      </form>
      {JSON.stringify(user)}
    </div>
  );
};

export default DashboardPage;
