import { User } from "@prisma/client";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Pfp from "../pfp";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle } from "lucide-react";

export function UserList({
  data,
  title,
}: {
  data: Pick<User, "image" | "username">[];
  title: "Followers" | "Following";
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {data.length == 0 ? (
        <Alert className="w-full">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Heads Up!</AlertTitle>
          <AlertDescription>Theres nothing here right now...</AlertDescription>
        </Alert>
      ) : (
        <div className="flex flex-col gap-1.25">
          {data.map((user) => (
            <div className="flex items-center gap-3 p-3">
              <Pfp
                username={user.username}
                src={user.image}
                className="h-9 w-9"
              />
              <Link
                href={`/users/${user.username}`}
                className="hover:opacity-80 duration-500"
              >
                <p className="font-semibold text-sm">{user.username}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </DialogContent>
  );
}
