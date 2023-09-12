"use client";

import { PostCard } from "@/components/posts/post-card";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { ExtendedPost } from "@/types/extensions";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

export default function Post({ params }: { params: { id: string } }) {
  const id = params.id;

  const router = useRouter();

  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: ["post", { id }],
    queryFn: async (): Promise<ExtendedPost> => {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) {
        throw new Error(
          "There was an error loading the post."
        );
      }
      const data = await res.json();
      console.log(data)
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
  });

  return (
    <div className="flex-1 w-full grid md:grid-cols-2 gap-6">
      {
        isPostLoading ?
        <></> :
        post &&
        <PostCard post={post} />
      }
    </div>  
  );
}
