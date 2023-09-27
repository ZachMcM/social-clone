import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User2 } from "lucide-react";
import Link from "next/link";

export default function Pfp({
  src,
  username,
  className,
}: {
  src?: string | null;
  username?: string;
  className?: string;
}) {
  return (
    <Link
      href={`/users/${username}`}
      className="hover:opacity-80 duration-500 z-10"
    >
      <Avatar className={cn(className)}>
        <AvatarImage src={src!} />
        <AvatarFallback className="bg-secondary" />
      </Avatar>
    </Link>
  );
}
