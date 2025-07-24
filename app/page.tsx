import MapFilterItems from "@/components/layout/MapFilterItems"
import ListingCard from "@/components/shared/ListingCard"
import NoItems from "@/components/shared/NoItems"
import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { unstable_noStore as noStore } from "next/cache"

/* --------------------------------- getData -------------------------------- */
const getData = async (searchParam: string, userId: string | undefined) => {
	try {
		noStore()

		const data = await prisma.home.findMany({
			where: {
				addedCategory: true,
				addedDescription: true,
				addedLocation: true,
				categoryName: searchParam ?? undefined,
			},
			select: {
				photo: true,
				id: true,
				price: true,
				description: true,
				country: true,
				favorite: {
					where: {
						userId: userId ?? undefined,
					},
				},
			},
		})
		return data
	} catch (error) {
		console.error(error)
	}
}

/* -------------------------------- HomePage -------------------------------- */
export default async function HomePage({ searchParams }: { searchParams: Promise<{ category: string }> }) {
	const searchParam = (await searchParams).category
	const { getUser } = getKindeServerSession()
	const user = await getUser()
	const data = await getData(searchParam, user?.id)

	return (
		<main className="container mx-auto px-5 lg:px-10">
			<MapFilterItems searchParams={searchParams} />
			{data?.length === 0 ? (
				<NoItems title={"Sorry no listings for this category found "} description={"Try changing your filters"} />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
					{data?.map((item) => (
						<ListingCard
							key={item.id}
							imagePath={item.photo as string}
							description={item.description as string}
							location={item.country as string}
							price={Number(item.price)}
							userId={user?.id}
							favoriteId={item.favorite[0]?.id as string}
							isInFavorite={item.favorite.length > 0}
							homeId={item.id as string}
							pathName="/"
						/>
					))}
				</div>
			)}
		</main>
	)
}
