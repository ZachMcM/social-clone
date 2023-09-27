"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "../providers/session-provider";
import { Button } from "../ui/button";

export default function DangerZone() {
  const { signOut, signingOut } = useSession();

  return (
    <div className="flex flex-col space-y-6 w-full">
      <p className="font-semibold text-xl">Danger Zone</p>
      <Button className="w-fit" variant="destructive" onClick={() => signOut()}>
        Sign Out{" "}
        {signingOut && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
      </Button>
    </div>
  );
}
