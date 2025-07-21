import MapFilterItems from "@/components/layout/MapFilterItems"

export default async function HomePage({
	searchParams,
}: {
	searchParams: Promise<{ category: string }>
}) {
	return (
		<main className="container mx-auto px-5 lg:px-10">
			<MapFilterItems searchParams={searchParams} />
		</main>
	)
}
