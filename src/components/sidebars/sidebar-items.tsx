import { sidebarItems } from "@/constants";
import Link from "next/link";
import { Logo } from "../logo";

export const SidebarItems = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div>
      <Logo className="md:hidden" />
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
  );
};
