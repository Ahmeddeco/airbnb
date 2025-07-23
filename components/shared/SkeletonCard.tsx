import { Skeleton } from "../ui/skeleton"

export default function SkeletonCard() {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton className="h-72 w-full rounded-lg" />
			<div className="flex flex-col gap-2">
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
			</div>
		</div>
	)
}
