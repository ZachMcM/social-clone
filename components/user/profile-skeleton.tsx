import { Skeleton } from "../ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton className="w-2/5 h-4" />
      <div className="flex items-center">
        <Skeleton className="rounded-full h-24 w-24" />
      </div>
      <div className="flex flex-col space-y-2">
        <Skeleton className="w-1/5 h-4" />
        <Skeleton className="w-3/5 h-4" />
      </div>
    </div>
  );
}
