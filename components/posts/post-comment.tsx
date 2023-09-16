import { ExtendedComment, ExtendedSession } from "@/types/prisma";
import { Comment } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "../ui/use-toast";
import { Check, Loader2, Trash2 } from "lucide-react";
import Pfp from "../pfp";
import Link from "next/link";
import { useSession } from "../providers/session-provider";

export function PostComment({
  comment,
}: {
  comment: ExtendedComment;
}) {
  const queryClient = useQueryClient();

  const { session } = useSession()

  const { mutate: deleteComment, isLoading: deletingComment } = useMutation({
    mutationFn: async (): Promise<Comment> => {
      const res = await fetch(`/api/posts/${comment.postId}/comments/${comment.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(
          "There was an error deleting your comment. Please try again."
        );
      }

      const data = await res.json();
      return data;
    },
    onError: (err: Error) => {
      console.log(err);
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["post", { id: comment.postId }],
      });
      console.log(data);
      toast({
        description: (
          <p className="flex items-center">
            Successfully deleted the comment. <Check className="h-4 w-4 ml-2" />
          </p>
        ),
      });
    },
  });

  return (
    <div className="w-full flex items-center gap-2.5 p-4">
      <Pfp
        username={comment.user.username}
        src={comment.user.image}
        className="h-8 w-8"
      />
      <div className="w-full flex flex-col">
        <Link href={`/users/${comment.user.username}`}>
          <p className="font-semibold text-xs">{comment.user.username}</p>
        </Link>
        <p className="text-sm">{comment.content}</p>
      </div>
      {
        session?.userId == comment.userId &&
        <button className="hover:opacity-80 duration-500" onClick={() => deleteComment()}>
          {
            !deletingComment ? 
            <Trash2 className="h-4 w-4 text-destructive"/> :
            <Loader2 className="h-4 w-4 animate-spin"/>
          }
        </button>
      }
    </div>
  );
}
