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
        <AvatarImage src={src!} />
        <AvatarFallback className="flex items-center justify-center bg-secondary">
          <User2 />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
