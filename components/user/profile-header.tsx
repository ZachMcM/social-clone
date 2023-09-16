"use client";

import { ExtendedUser } from "@/types/prisma";
import Pfp from "../pfp";
import { useSession } from "../providers/session-provider";
import { Button } from "../ui/button";
import Link from "next/link";
import { FollowButton } from "./follow-button";
import { sharePage } from "@/lib/share-page";

export function ProfileHeader({ user }: { user: ExtendedUser }) {
  const { session } = useSession();

  const shareData = {
    title: "Check out this profile!",
    text: user.username,
    url: `${process.env.NEXT_PUBLIC_URL}/users/${user.username}`,
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <p className="font-bold text-lg">{user.username}</p>
        <div className="flex items-center gap-4">
          {session?.user.username == user.username ? (
            <Link href="/settings">
              <Button variant="secondary">Edit Profile</Button>
            </Link>
          ) : (
            session && <FollowButton user={user} />
          )}
          <Button variant="secondary" onClick={() => sharePage(shareData)}>
            Share Profile
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <Pfp
          className="rounded-full h-24 w-24"
          src={user.image}
          username={user.username}
        />
        <div className="flex items-center gap-6">
          <p>
            <span className="font-bold">{user.posts.length}</span> Posts
          </p>
          <p>
            <span className="font-bold">{user.followers.length}</span> Followers
          </p>
          <p>
            <span className="font-bold">{user.follows.length}</span> Following
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm">{user.bio}</p>
      </div>
    </div>
  );
}
