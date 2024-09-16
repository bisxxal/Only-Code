import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col mx-auto mt-4 space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px w-full " />
        <Skeleton className="h-4 w-[200px w-full " />
      </div>
      <Skeleton className="h-[225px] w-[250px w-full rounded-xl" />
    </div>
  )
}
