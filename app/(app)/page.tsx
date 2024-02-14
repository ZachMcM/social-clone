import FeedServer from "@/components/feed/feed-server";
import { FeedSkeleton } from "@/components/feed/feed-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <FeedServer />
    </Suspense>
  );
}
