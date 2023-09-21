import Feed from "@/components/feed/feed"
import { FeedSkeleton } from "@/components/feed/feed-skeleton"
import { ExtendedPost } from "@/types/prisma"
import { Suspense } from "react"

async function getInitialData(): Promise<ExtendedPost[]> {
  const res = await fetch(`${process.env.URL}/api/feed?cursor=0`, { cache: 'no-store' })
  const data = await res.json()
  return data
}

export default async function Home() {
  const initialPosts = await getInitialData()

  return (
    <Suspense fallback={<FeedSkeleton/>}>
      <Feed initialData={initialPosts}/>
    </Suspense>
  )
}
