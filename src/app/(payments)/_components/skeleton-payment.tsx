import { Skeleton } from "~/components/ui/skeleton";

export function SkeletonPayment() {
  return (
    <div className="border-gray-250 flex flex-col gap-2 rounded bg-gray-200 p-2">
      <div className="flex flex-1 gap-2">
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="h-12 w-full rounded" />
      </div>
      <Skeleton className="h-[700px] w-full rounded" />
      <div className="flex gap-5">
        <Skeleton className="h-12 w-12 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-12 w-12 rounded" />
          <Skeleton className="h-12 w-12 rounded" />
        </div>
        <Skeleton className="h-12 w-12 rounded" />
      </div>
    </div>
  );
}
