"use client";

import { useInfiniteQuery } from "react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { FeedSkeleton } from "@/components/feed/feed-skeleton";
import { ExtendedPost } from "@/types/prisma";
import { FeedPost } from "@/components/feed/feed-post";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const { data: posts, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryFn: async ({ pageParam = 0 }): Promise<ExtendedPost[]> => {
        const res = await fetch("/api/feed?cursor=" + pageParam);
        if (!res.ok) {
          throw new Error("There was an error loading your feed.")
        }
        const data = await res.json();
        console.log(data)
        return data;
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      onError: (err: Error) => {
        console.log(err)
        toast({
          description: err.message,
          variant: "destructive",
          action: <ToastAction altText="try again" onClick={() => router.refresh()}>Try again</ToastAction>
        })
      },
      queryKey: ['feed']
    });

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("getting next page")
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div className="flex-1 w-full h-full flex items-center flex-col gap-8">
      {isLoading ? (
        <FeedSkeleton />
      ) : (
        posts && posts.pages && (
          <>
            {posts.pages.flatMap((page) => page).map((post, i) => {
              if (i === posts.pages.length - 1) {
                return (
                  <div ref={ref} key={post.id}>
                    <FeedPost post={post} />
                  </div>
                );
              } else {
                return <FeedPost key={post.id} post={post} />;
              }
            })}
            {isFetchingNextPage && <Loader2 className="h-4 w-4 animate-spin" />}
          </>
        )
      )}
    </div>
  );
}
