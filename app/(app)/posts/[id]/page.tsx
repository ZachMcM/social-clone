"use client";

import { CommentsSkeleton } from "@/components/posts/comments-skeleton";
import { PostCard } from "@/components/posts/post-card";
import { PostCardSkeleton } from "@/components/posts/post-card-skeleton";
import { PostComments } from "@/components/posts/post-comments";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { ExtendedComment, ExtendedPost } from "@/types/prisma";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

export default function Post({ params }: { params: { id: string } }) {
  const id = params.id;

  const router = useRouter();

  const { data: post, isLoading: postLoading } = useQuery({
    queryFn: async (): Promise<ExtendedPost> => {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) {
        throw new Error("There was an error loading the post.");
      }
      const data = await res.json();
      console.log(data);
      return data;
    },
    onError: (err: Error) => {
      console.log(err);
      toast({
        description: err.message,
        variant: "destructive",
        action: (
          <ToastAction altText="try again" onClick={() => router.refresh()}>
            Try again
          </ToastAction>
        ),
      });
    },
    queryKey: ["post", { id }],
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryFn: async (): Promise<ExtendedComment[]> => {
      const res = await fetch(`/api/posts/${id}/comments`);
      if (!res.ok) {
        throw new Error("Therre was an error loading the comments.");
      }
      const data = await res.json();
      return data;
    },
    onError: (err: Error) => {
      toast({
        description: err.message,
        variant: "destructive",
        action: (
          <ToastAction altText="try again" onClick={() => router.refresh()}>
            Try again
          </ToastAction>
        ),
      });
    },
    queryKey: ["comments"],
  });

  return (
    <div className="flex-1 w-full grid md:grid-cols-2 gap-6 h-[600px]">
      {post && comments ? (
        <>
          <PostCard post={post} />
          <PostComments postId={post.id} comments={comments} />
        </>
      ) : (
        <>
          <PostCardSkeleton />
          <CommentsSkeleton />
        </>
      )}
    </div>
  );
}
