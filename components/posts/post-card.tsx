"use client";

import { ExtendedPost, ExtendedSession } from "@/types/extensions";
import Pfp from "../pfp";
import { LikeButton } from "./like-button";
import Link from "next/link";

export function PostCard({
  post,
  session,
}: {
  post: ExtendedPost;
  session: null | ExtendedSession;
}) {
  return (
    <div className="w-full flex flex-col aspect-square rounded-md border bg-background shadow-sm">
      <Link href={`/users/${post.user.username}`} className="hover:opacity-80 duration-500">
        <div className="flex items-center gap-2.5 p-3">
          <Pfp
            username={post.user.username}
            src={post.user.image}
            className="h-7 w-7"
          />
          <p className="font-semibold text-sm">{post.user.username}</p>
        </div>
      </Link>
      <div className="flex-1 w-full flex justify-center">
        <img
          src={post.image}
          alt={post.caption}
          className=" object-center object-contain h-full"
        />
      </div>
      <div className="p-3 flex flex-col gap-2.5">
        <LikeButton session={session} post={post} />
        <p className="text-sm">
          <span className="font-semibold">{post.user.username}</span>{" "}
          {post.caption}
        </p>
      </div>
    </div>
  );
}
