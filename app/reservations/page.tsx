import ListingCard from "@/components/shared/ListingCard"
import NoItems from "@/components/shared/NoItems"
import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

type Data =
	| {
			Home: {
				id: string
				description: string | null
				country: string | null
				photo: string | null
				price: string | null
				favorite: {
					id: string
					createdAt: Date
					userId: string | null
					homeId: string | null
				}[]
			} | null
	  }[]
	| undefined
const getData = async (userId: string) => {
	try {
		const data = await prisma.reservation.findMany({
			where: { userId: userId },
			select: {
				Home: {
					select: {
						id: true,
						photo: true,
						description: true,
						country: true,
						price: true,
						favorite: {
							where: {
								userId: userId,
							},
						},
					},
				},
			},
		})
		return data
	} catch (error) {
		console.error(error)
	}
}

export default async function ReservationsPage() {
	const { getUser } = getKindeServerSession()
	const user = await getUser()
	if (!user) {
		redirect("/")
	}

	const data: Data = await getData(user?.id as string)

	return (
		<section className="container mx-auto py-5 lg:px-10 mt-10 ">
			<h2>your reservations</h2>
			{data?.length === 0 ? (
				<NoItems title={"Sorry you don't have any favorites"} description={"Please add some favorites."} />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
					{data?.map((item, index) => (
						<ListingCard
							key={index}
							imagePath={item.Home?.photo!}
							description={item.Home?.description!}
							location={item.Home?.country!}
							price={+item.Home?.price!}
							userId={user?.id}
							isInFavorite={+item.Home?.favorite.length! > 0 ? true : false}
							favoriteId={item.Home?.favorite[0].id!}
							homeId={item.Home?.id!}
							pathName={"/favorites"}
						/>
					))}
				</div>
			)}
		</section>
	)
}
