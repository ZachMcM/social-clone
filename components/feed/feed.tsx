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

export default function Feed({ initialData }: { initialData: ExtendedPost[] }) {
  const router = useRouter();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch("/api/feed?cursor=" + pageParam);
      if (!res.ok) {
        throw new Error("There was an error loading your feed.");
      }
      const data = await res.json();
      console.log(data);
      return data;
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: {
      pages: [initialData],
      pageParams: [1],
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

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("getting next page");
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts: ExtendedPost[] =
    data?.pages.flatMap((page) => page) ?? initialData;

  return (
    <div className="flex-1 w-full h-full flex items-center flex-col gap-8">
      {posts.map((post, i) => {
        if (i === posts.length - 1) {
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
    </div>
  );
}
