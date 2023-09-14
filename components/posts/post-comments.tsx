import { ExtendedPost, ExtendedSession } from "@/types/extensions";
import { PostComment } from "./post-comment";

export function PostComments({ post, session }: { post: ExtendedPost, session: ExtendedSession }) {
  return (
    <div className="w-full h-full aspect-square border rounded-md">
      {
        post.comments.map(comment => (
          // TODO 
          <PostComment comment={comment} session={session}/>
        ))
      }
      {/* Need to add new comment section */}
    </div>
  )
}