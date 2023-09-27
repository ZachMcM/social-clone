"use client";

import { ExtendedComment } from "@/types/prisma";
import { PostComment } from "./post-comment";
import { CommentForm } from "./comment-form";

export function PostComments({
  comments,
  postId,
}: {
  comments: ExtendedComment[];
  postId: string;
}) {
  return (
    <div className="w-full h-full aspect-square border rounded-md relative">
      {comments.length == 0 || !comments ? (
        <p className="font-medium text-sm p-4">No comments.</p>
      ) : (
        comments.map((comment) => (
          // TODO
          <PostComment comment={comment} key={postId} />
        ))
      )}
      <CommentForm postId={postId} />
    </div>
  );
}
