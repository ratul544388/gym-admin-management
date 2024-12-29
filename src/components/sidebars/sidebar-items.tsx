import { cn } from "@/lib/utils";
import { Logo } from "../logo";
import { sidebarItems } from "@/constants";
import Link from "next/link";
import { Button } from "../ui/button";

export const SidebarItems = ({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) => {
  return (
    <div className={cn("flex h-full flex-col w-full justify-between", className)}>
      <div className="">
        <Logo className="md:hidden"/>
        <nav className="mt-8 md:mt-16">
          <ul>
            {sidebarItems.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <Link
                  onClick={onClose}
                  href={href}
                  className="flex items-center gap-2 px-6 py-2.5 hover:bg-accent"
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Button>Logout Here</Button>
    </div>
  );
};
