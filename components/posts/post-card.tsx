"use client";

import { ExtendedPost, ExtendedSession } from "@/types/extensions";
import Pfp from "../pfp";
import { LikeButton } from "./like-button";
import Link from "next/link";
import { useSession } from "../providers/session-provider";

export function PostCard({ post }: { post: ExtendedPost }) {
  const { session } = useSession();

  return (
    <div className="w-full h-full flex flex-col aspect-square rounded-md border bg-background shadow-sm ">
      <div className="flex items-center gap-2.5 p-3 border-b">
        <Pfp
          username={post.user.username}
          src={post.user.image}
          className="h-7 w-7"
        />
        <Link
          href={`/users/${post.user.username}`}
          className="hover:opacity-80 duration-500"
        >
          {" "}
          <p className="font-semibold text-sm">{post.user.username}</p>
        </Link>
      </div>
      <div className="flex-1 w-full flex justify-center h-full">
        <img src={post.image} alt={post.caption} className="object-center object-cover" />
      </div>
      <div className="p-3 flex flex-col gap-1.5 border-t">
        {session != undefined && <LikeButton session={session} post={post} />}
        <p className="text-sm">
          <span className="font-semibold">{post.user.username}</span>{" "}
          {post.caption}
        </p>
      </div>
    </div>
  );
}
