import { getCurrentUser } from "@/lib/get-current-user";
import { Container } from "./container";
import { Logo } from "./logo";
import { MobileSidebar } from "./sidebars/mobile-sidebar";
import { ThemeToggler } from "./theme-toggler";
import { UserButton } from "./user-button";

export const Header = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container
      elem="header"
      className="sticky top-0 z-50 flex h-[65px] items-center border-b bg-background max-w-[initial]"
    >
      <div className="flex items-center gap-3">
        <MobileSidebar currentUser={currentUser} />
        <Logo href={currentUser?.role === "ADMIN" ? "/dashboard" : "/"} />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <ThemeToggler />
        <UserButton currentUser={currentUser} />
      </div>
    </Container>
  );
};
