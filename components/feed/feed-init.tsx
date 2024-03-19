"use client";

import Feed from "@/components/feed/feed";
import { useQuery } from "react-query";
import { FeedSkeleton } from "./feed-skeleton";
import { ExtendedPost } from "@/types/prisma";

export function FeedInit() {
  const { data: initialData, isLoading } = useQuery({
    queryFn: async (): Promise<ExtendedPost[]> => {
      const res = await fetch("api/feed?cursor=0")
      const data = await res.json();
      console.log(data)
      return data;
    },
    cacheTime: 0,
  });

  return (
    <>
      {!isLoading && initialData ? <Feed initialData={initialData}/> : <FeedSkeleton/>}
    </>
  );
}
