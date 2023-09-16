"use client"

import { useId } from "react"
import { Skeleton } from "../ui/skeleton"

export function FeedSkeleton() {
  return (
    <>
    {
      Array(4).fill("").map(s => (
        <Skeleton className="rounded-md aspect-square w-[525px]" key={useId()}/>
      ))  
    }
    </>
  )
}