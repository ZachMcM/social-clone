"use client"

import { useId } from "react"
import { Skeleton } from "../ui/skeleton"

export function FeedSkeleton() {
  return (
    <div className="flex-1 w-full h-full flex items-center flex-col gap-8">
    {
      Array(4).fill("").map(s => (
        <Skeleton className="rounded-md aspect-square w-full md:w-[525px]" key={useId()}/>
      ))  
    }
    </div>
  )
}