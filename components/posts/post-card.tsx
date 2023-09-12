"use client"

import { ExtendedPost } from "@/types/extensions";
import Pfp from "../pfp";

export function PostCard({ post }: { post: ExtendedPost }) {
  return (
    <div className="w-full flex flex-col aspect-square rounded-md border bg-background shadow-sm">
      <div className="flex items-center gap-2 p-2.5">
        <Pfp username={post.user.username} src={post.user.image} className="h-8 w-8"/>
        <p className="font-semibold text-sm">{post.user.username}</p>
      </div>
      <div className="flex-1 w-full flex justify-center border-t">
        <img src={post.image} alt={post.caption} className=" object-center object-contain h-full" />
      </div>
      <div className="p-2.5 flex flex-col gap-2">
        {/* TODO */}
        <p className="text-sm"><span className="font-semibold">{post.user.username}</span> {post.caption}</p>
      </div>
    </div>
  )
}