import { useId } from "react";
import { Skeleton } from "../ui/skeleton";

export function CommentsSkeleton() {
  return (
    <div className="w-full h-full aspect-square border rounded-md p-3 flex flex-col justify-center space-y-6 overflow-y-hidden">
      {
        Array(9).fill("").map(s => (
          <div className="w-full flex items-center gap-2.5" key={useId()}>
            <Skeleton className="h-8 w-8 rounded-full shrink-0"/>
            <div className="w-full flex flex-col gap-1">
              <Skeleton className="w-full h-3"/>
              <Skeleton className="w-1/2 h-3"/>
            </div>
          </div>
        ))
      }
    </div>
  )
}