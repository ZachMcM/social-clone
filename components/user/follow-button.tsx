"use client"

import { ExtendedUser } from "@/types/prisma";
import { useSession } from "../providers/session-provider";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";

export function FollowButton({ user }: { user: ExtendedUser }) {
  const { session } = useSession()
  const queryClient = useQueryClient()

  function getIsFollower() {
    for (const follower of user.followers) {
      if (follower.username == session?.user.username) {
        return true
      }
    }
    return false
  }

  const { mutate: changeFollow } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/follow`, {
        method: "PATCH",
        body: JSON.stringify({ username: user.username })
      })

      if (!res.ok) {
        throw new Error("There was an error upadting the follow status. Please try again.")
      }

      const data = await res.json()
      return data
    },
    onError: (err: Error) => {
      console.log(err)
      toast({
        description: err.message,
        variant: "destructive"
      })
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['users', { username: user.username }] })
      queryClient.invalidateQueries({ queryKey: ['users', { username: session?.user.username }] })
    }
  })

  const [isFollower, setIsFollower] = useState<boolean>(getIsFollower())

  function handleFollowUpdate() {
    setIsFollower(!isFollower)
    changeFollow()
  }

  return (
    <Button variant="secondary" onClick={handleFollowUpdate}>{isFollower ? "Unfollow" : "Follow"}</Button>
  )
}