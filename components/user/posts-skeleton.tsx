"use client"

import { useId } from "react";
import { Skeleton } from "../ui/skeleton";

export function PostsSkeleton() {
  return (
    <div className="w-full h-full flex-1 grid grid-cols-3 gap-6">
      {
        Array(9).fill("").map((s) => (
          <Skeleton className="rounded-md h-[300px] w-full aspect-square" key={useId()}/>
        ))
      }
    </div>
  )
}