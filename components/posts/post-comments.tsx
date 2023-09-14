import { ExtendedComment } from "@/types/extensions";
import { PostComment } from "./post-comment";

export function PostComments({ comments }: { comments: ExtendedComment[] }) {
  return (
    <div className="w-full h-full aspect-square border rounded-md">
      {
        comments.map(comment => (
          // TODO 
          <PostComment comment={comment}/>
        ))
      }
      {/* Need to add new comment section */}
    </div>
  )
}