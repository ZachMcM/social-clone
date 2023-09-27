"use client";

import { useSession } from "@/components/providers/session-provider";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { PostList } from "@/components/user/post-list";
import { PostsSkeleton } from "@/components/user/posts-skeleton";
import { ProfileHeader } from "@/components/user/profile-header";
import { ProfileSkeleton } from "@/components/user/profile-skeleton";
import { ExtendedUser } from "@/types/prisma";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

export default function User({ params }: { params: { username: string } }) {
  const username = params.username;
  const router = useRouter();
  const { sessionLoading } = useSession();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["users", { username: username }],
    queryFn: async (): Promise<ExtendedUser> => {
      const res = await fetch(`/api/users/${username}`);
      if (!res.ok) {
        throw new Error("There was an error loading the user.");
      }
      const data = await res.json();
      return data;
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

  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      {!userLoading && !sessionLoading && user ? (
        <>
          <ProfileHeader user={user} />
          <PostList posts={user.posts} />
        </>
      ) : (
        <>
          <ProfileSkeleton />
          <PostsSkeleton />
        </>
      )}
    </div>
  );
}
