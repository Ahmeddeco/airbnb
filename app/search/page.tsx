import ListingCard from "@/components/shared/ListingCard"
import NoItems from "@/components/shared/NoItems"
import { prisma } from "@/lib/prisma"

type searchParamsType = {
	locationValue: string
	guests: string
	rooms: string
	bathrooms: string
}

const getData = async (searchParams: searchParamsType) => {
	try {
		const data = await prisma.home.findMany({
			where: {
				addedCategory: true,
				addedDescription: true,
				addedLocation: true,
				guests: searchParams.guests ?? undefined,
				bedrooms: searchParams.rooms ?? undefined,
				bathrooms: searchParams.bathrooms ?? undefined,
				country: searchParams.locationValue ?? undefined,
			},
			select: {
				photo: true,
				id: true,
				price: true,
				description: true,
				country: true,
				favorite: { select: { id: true } },
				userId: true,
			},
		})
		return data
	} catch (error) {
		console.error(error)
	}
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<searchParamsType> }) {
	const params = await searchParams
	const data = await getData(params)

	return (
		<div className="container mx-auto mt-12">
			{data?.length === 0 ? (
				<NoItems title={"there are no results"} description={"no home are matching your search"} />
			) : (
				<>
					<div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
						{data?.map((item) => (
							<ListingCard
								key={item.id}
								imagePath={item.photo as string}
								description={item.description as string}
								location={item.country as string}
								price={Number(item.price)}
								userId={item.userId as string}
								favoriteId={item.favorite[0]?.id}
								isInFavorite={item.favorite.length > 0}
								homeId={item.id as string}
								pathName="/"
							/>
						))}
					</div>
				</>
			)}
		</div>
	)
}
