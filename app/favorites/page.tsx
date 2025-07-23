import ListingCard from "@/components/shared/ListingCard"
import NoItems from "@/components/shared/NoItems"
import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const getData = async (userId: string) => {
	try {
		const data = await prisma.favorite.findMany({
			where: {
				userId: userId,
			},
			select: {
				home: {
					select: {
						photo: true,
						id: true,
						favorite: true,
						price: true,
						country: true,
						description: true,
					},
				},
			},
		})
		return data
	} catch (error) {
		console.error(error)
	}
}

export default async function FavoritesPage() {
	const { getUser } = getKindeServerSession()
	const user = await getUser()
	if (!user) {
		redirect("/")
	}
	const data = await getData(user?.id as string)

	return (
		<section className="container mx-auto py-5 lg:px-10 mt-10 ">
			<h2>your favorite</h2>
			{data?.length === 0 ? (
				<NoItems title={"Sorry you don't have any favorites"} description={"Please add some favorites."} />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
					{data?.map((item) => (
						<ListingCard
							key={item.home?.id}
							imagePath={item.home?.photo!}
							description={item.home?.description!}
							location={item.home?.country!}
							price={+item.home?.price!}
							userId={user?.id}
							isInFavorite={+item.home?.favorite.length! > 0 ? true : false}
							favoriteId={item.home?.favorite[0].id!}
							homeId={item.home?.id!}
							pathName={"/favorites"}
						/>
					))}
				</div>
			)}
		</section>
	)
}
