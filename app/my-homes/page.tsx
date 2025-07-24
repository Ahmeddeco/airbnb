import ListingCard from "@/components/shared/ListingCard"
import NoItems from "@/components/shared/NoItems"
import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"

/* --------------------------------- getData -------------------------------- */
const getData = async (userId: string) => {
	try {
		noStore()

		const data = await prisma.home.findMany({
			where: {
				userId: userId,
				addedCategory: true,
				addedDescription: true,
				addedLocation: true,
			},
			select: {
				id: true,
				country: true,
				photo: true,
				description: true,
				price: true,
				favorite: {
					where: {
						userId: userId,
					},
				},
			},
			orderBy: { createdAt: "desc" },
		})
		return data
	} catch (error) {
		console.error(error)
	}
}

/* ------------------------------- MyHomesPage ------------------------------ */
export default async function MyHomesPage() {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user) {
		redirect("/")
	}

	const data = await getData(user.id)

	return (
		<section className="container mx-auto px-5 lg:px-10 mt-10">
			<h2>your homes</h2>
			{data?.length === 0 ? (
				<NoItems title={"you don't have any homes"} description={"Please add some homes"} />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
					{data?.map((item) => (
						<ListingCard
							key={item.id}
							imagePath={item.photo!}
							description={item.description!}
							location={item.country!}
							price={+item.price!}
							userId={user.id}
							isInFavorite={item.favorite.length > 0 ? true : false}
							favoriteId={item.favorite[0]?.id!}
							homeId={item.id!}
							pathName={"/my-homes"}
						/>
					))}
				</div>
			)}
		</section>
	)
}
