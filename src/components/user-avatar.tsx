import { placeholderImage } from "@/constants";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  src: string | null | undefined;
  fallback?: string;
  className?: string;
}

export default function UserAvatar({
  src,
  fallback,
  className,
}: UserAvatarProps) {
  const avatarFallback = fallback
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join(" ");
  return (
    <Avatar className={cn("size-9", className)}>
      <AvatarImage
        src={src || placeholderImage}
        alt={fallback}
        className="object-cover"
      />
      <AvatarFallback>{avatarFallback}</AvatarFallback>
    </Avatar>
  );
}
