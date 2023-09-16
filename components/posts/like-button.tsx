"use client";

import { ExtendedPost, ExtendedSession } from "@/types/prisma";
import { Like } from "@prisma/client";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import { TbHeart, TbHeartFilled } from "react-icons/tb"

export function LikeButton({
  post,
  session,
}: {
  post: ExtendedPost;
  session: ExtendedSession | null;
}) {
  function getInitialLike(): boolean {
    if (!session) {
      return false;
    }

    for (const like of post.likes) {
      if (like.userId == session.userId) {
        return true;
      }
    }

    return false;
  }

  const initialLike = getInitialLike();

  const [count, setCount] = useState<number>(post.likes.length);
  const [liked, setLiked] = useState<boolean>(initialLike);

  const { mutate: updateLikes } = useMutation({
    mutationFn: async (): Promise<Like> => {
      const res = await fetch(`/api/posts/${post.id}/likes`, {
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error(
          "There was an error updating the likes. Please try again."
        );
      }

      const data = await res.json();
      return data;
    },
    onError: (err: Error) => {
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
  });

  function handleLikeUpdate() {
    if (session) {
      if (liked) {
        setCount(count - 1)
      } else {
        setCount(count + 1)
      }
      setLiked(!liked)
      updateLikes();
    } else {
      toast({
        description: "You are not signed in. Please sign in to like.",
        action: (
          <Link href="/signin">
            <ToastAction altText="sign in">Sign In</ToastAction>
          </Link>
        ),
      });
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <p className="text-sm font-medium">{count} Like{count != 1 && "s"}</p>
      <button onClick={() => handleLikeUpdate()} className="hover:opacity-80 duration-500 z-10">
        {
          liked ?
          <TbHeartFilled className="h-5 w-5 text-red-500"/> :
          <TbHeart className="h-5 w-5"/>
        }
      </button>
    </div>
  );
}
