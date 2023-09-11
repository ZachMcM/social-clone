"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { ThemeButton } from "./theme-button";
import Link from "next/link";
import { useSession } from "../providers/session-provider";
import { Plus, PlusSquare } from "lucide-react";

export function NavHeader() {
  const { session, sessionLoading } = useSession();

  return (
    <header className="sticky bg-background top-0 left-0 w-full flex items-center h-20 px-6 md:px-16">
      <div className="flex items-center justify-between w-full">
        <Link href="/"><p className="font-semibold">Social Clone</p></Link>
        <div className="flex items-center gap-1">
          {!sessionLoading && !session && (
            <Link href="/signin">
              <Button variant="secondary">Sign In</Button>
            </Link>
          )}
          <Link href="/posts/new">
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5"/>
            </Button>
          </Link>
          <ThemeButton />
          <a href="https://github.com/ZachMcM/social-clone">
            <Button variant="ghost" size="icon">
              <GitHubLogoIcon className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
