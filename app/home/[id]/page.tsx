import CategoryShowcase from "@/components/shared/CategoryShowcase"
import HomeMap from "@/components/shared/HomeMap"
import SelectCalender from "@/components/shared/SelectCalender"
import { ReservationSubmitButton } from "@/components/shared/SubmitButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { createReservation } from "@/function/actions"
import { useCountries } from "@/lib/getCountries"
import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Form from "next/form"
import Image from "next/image"
import Link from "next/link"

/* --------------------------------- getDAta -------------------------------- */
const getDAta = async (homeId: string) => {
	try {
		const data = await prisma.home.findUnique({
			where: {
				id: homeId,
			},
			select: {
				title: true,
				description: true,
				guests: true,
				bedrooms: true,
				bathrooms: true,
				photo: true,
				categoryName: true,
				price: true,
				country: true,
				User: {
					select: { profileImage: true, firstName: true, lastName: true, createdAt: true },
				},
				reservation: { where: { homeId: homeId } },
			},
		})
		return data
	} catch (error) {
		console.error(error)
	}
}

/* -------------------------------- HomePage -------------------------------- */
export default async function HomePage({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id
	const data = await getDAta(id)
	const { getCountryByValue } = useCountries()
	const country = getCountryByValue(data?.country!)
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	return (
		<Card className="w-[75%] mx-auto my-12">
			<CardContent className=" flex flex-col gap-8 ">
				<h1>{data?.title}</h1>
				<div className="relative h-[550px]">
					<Image
						src={process.env.IMAGE_URL + data?.photo!}
						alt={"home"}
						fill
						className="rounded-lg h-full w-full object-cover"
					/>
				</div>
				<div className="flex justify-between gap-24">
					<div className="w-2/3">
						<h3>
							{country?.flag} {country?.label} / {country?.region}{" "}
						</h3>
						<p>
							{data?.guests} Guests . {data?.bedrooms} Bedrooms . {data?.bathrooms} Bathrooms
						</p>
						<div className="flex items-center gap-4 ">
							<Image src={data?.User?.profileImage!} alt={"user"} width={60} height={60} className="rounded-full" />
							<div className="flex flex-col gap-0.5">
								<h3>
									hosted by {data?.User?.firstName} {data?.User?.lastName}
								</h3>
								<p className="capitalize">Hosted since {data?.User?.createdAt!.toLocaleDateString("en-UK")}</p>
							</div>
						</div>
						<Separator />
						<CategoryShowcase categoryName={data?.categoryName!} />
						<Separator />
						<p>{data?.description}</p>
						<Separator />
						<HomeMap locationValue={data?.country!} />
					</div>
					<Form action={createReservation} className="flex flex-col gap-4 ">
						<Input type="hidden" name="homeId" value={id} />
						<Input type="hidden" name="userId" value={user?.id} />
						<SelectCalender reservation={data?.reservation} />
						{user?.id ? (
							<ReservationSubmitButton />
						) : (
							<Button asChild>
								<Link href={"/api/auth/login"}>login</Link>
							</Button>
						)}
					</Form>
				</div>
			</CardContent>
		</Card>
	)
}
