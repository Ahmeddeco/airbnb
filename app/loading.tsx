import SkeletonCard from "@/components/shared/SkeletonCard"

export default function HomeLoading() {
	return (
		<section className="container mx-auto px-5 lg:px-10 mt-10">
			<h2>your favorite</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
		</section>
	)
}
