"use client";

import { ExtendedPost } from "@/types/prisma";
import Pfp from "../pfp";
import { LikeButton } from "./like-button";
import Link from "next/link";
import { useSession } from "../providers/session-provider";
import Image from "next/image";
import { PostMore } from "./post-more";

export function PostCard({ post }: { post: ExtendedPost }) {
  const { session } = useSession();

  return (
    <div className="w-full h-full flex flex-col aspect-square rounded-md border bg-background shadow-sm">
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
          <p className="font-semibold text-sm">{post.user.username}</p>
        </Link>
      </div>
      <div className="flex-1 w-full flex justify-center h-full relative">
        <Image src={post.image} fill alt={post.caption} objectFit="contain" />
      </div>
      <div className="w-full flex items-center p-3 justify-between border-t">
        <div className="flex flex-col gap-1.5">
          {session != undefined && <LikeButton session={session} post={post} />}
          <p className="text-sm">
            <span className="font-semibold">{post.user.username}</span>{" "}
            {post.caption}
          </p>
        </div>
        <PostMore post={post} />
      </div>
    </div>
  );
}
