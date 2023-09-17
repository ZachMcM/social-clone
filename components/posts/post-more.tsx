"use client";

import { ExtendedPost } from "@/types/prisma";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Check, Loader2, MoreHorizontal } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useSession } from "../providers/session-provider";
import { useMutation, useQueryClient } from "react-query";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import { sharePage } from "@/lib/share-page";
import { useState } from "react";

export function PostMore({ post }: { post: ExtendedPost }) {
  const shareData = {
    title: "Check out this post!",
    text: post.caption,
    url: `${process.env.NEXT_PUBLIC_URL}/posts/${post.id}`,
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const { session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: deletePost, isLoading: isDeletingPost } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(
          "There was an error deleting the post. Please try again."
        );
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["users", { username: session?.user.username }],
      });
      console.log(data);
      toast({
        description: (
          <p className="flex items-center">
            Successfully deleted post. <Check className="h-4 w-4 ml-2" />
          </p>
        ),
      });
      if (pathname == `/posts/${post.id}`) {
        router.push(`/users/${session?.user.username}`);
      } else {
        setDeleteDialogOpen(false);
      }
    },
    onError: (err: Error) => {
      console.log(err);
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AlertDialog
      open={deleteDialogOpen}
      onOpenChange={() => setDeleteDialogOpen(!deleteDialogOpen)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="z-10">
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => sharePage(shareData)}>
              Share
            </DropdownMenuItem>
            {session?.userId == post.userId && (
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="!text-destructive">
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogHeader>Are you absolutely sure?</AlertDialogHeader>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this post?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={() => deletePost()}>
            Delete{" "}
            {isDeletingPost && (
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
