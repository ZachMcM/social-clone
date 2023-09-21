import Feed from "@/components/feed/feed"
import { ExtendedPost } from "@/types/prisma"

async function getInitialData(): Promise<ExtendedPost[]> {
  const res = await fetch(`${process.env.URL}/api/feed?cursor=0`, { cache: 'no-store' })
  const data = await res.json()
  return data
}

export default async function FeedServer() {
  const initialPosts = await getInitialData()

  return <Feed initialData={initialPosts}/>
}
