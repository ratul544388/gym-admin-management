import { placeholderImage } from "@/constants";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  src: string | null | undefined;
  alt: string | null | undefined;
  size?: number;
  className?: string;
}

export default function UserAvatar({ src, alt, className }: UserAvatarProps) {
  const fallbackLabel = (alt || "Avatar")
    .split(" ")
    .map((word) => word.charAt(0))
    .join(" ");
  return (
    <Avatar className={cn("size-9", className)}>
      <AvatarImage
        src={src || placeholderImage}
        alt={alt || "Avatar"}
        className="object-cover"
      />
      <AvatarFallback>{fallbackLabel}</AvatarFallback>
    </Avatar>
  );
}
