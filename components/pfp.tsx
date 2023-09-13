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
  username: string
  className?: string;
}) {
  return (
    <Link href={`/user/${username}`} className="hover:opacity-80 duration-500">
      <Avatar className={cn(className)}>
        <AvatarImage src={src || "images/fallback.jpeg"} />
        <AvatarFallback className="bg-secondary"/>
      </Avatar>
    </Link>
  );
}
