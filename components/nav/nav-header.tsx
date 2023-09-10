"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { ThemeButton } from "./theme-button";
import Link from "next/link";
import { useSession } from "../providers/session-provider";

export function NavHeader() {
  const { session, sessionLoading } = useSession();

  return (
    <header className="sticky top-0 left-0 w-full flex items-center h-14 px-6 md:px-10 border-b">
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold">Social Clone</p>
        <div className="flex items-center gap-2">
          {!sessionLoading && !session && (
            <Link href="/signin">
              <Button variant="secondary">Sign In</Button>
            </Link>
          )}
          <ThemeButton />
          <a href="https://github.com/ZachMcM/social-clone">
            <Button variant="outline" size="icon">
              <GitHubLogoIcon className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
