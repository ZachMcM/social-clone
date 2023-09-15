import { Skeleton } from "../ui/skeleton";

export function PostCardSkeleton() {
  return (
    <div className="w-full h-full flex flex-col aspect-square rounded-md border bg-background shadow-sm">
      <div className="flex items-center gap-2.5 p-3">
        <Skeleton className="rounded-full h-7 w-7" />
        <Skeleton className="w-1/4 h-3" />
      </div>
      <Skeleton className="flex-1 w-full h-full aspect-square rounded-none" />
      <div className="p-3 flex flex-col gap-2.5">
        <Skeleton className="w-1/4 h-3" />
        <div className="flex items-center gap-2.5 p-3">
          <Skeleton className="rounded-full h-7 w-7" />
          <Skeleton className="w-full h-3" />
        </div>
      </div>
    </div>
  );
}
