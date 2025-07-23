import { useCountries } from "@/lib/getCountries"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import { AddToFavoriteButton } from "./SubmitButtons"
import Form from "next/form"
import { Input } from "../ui/input"
import { addToFavorite, deleteFromFavorite } from "@/function/actions"

type AppProps = {
	imagePath: string
	description: string
	location: string
	price: number
	userId: string | undefined
	isInFavorite: boolean
	favoriteId: string
	homeId: string
	pathName: string
}

export default function ListingCard({
	description,
	imagePath,
	location,
	price,
	userId,
	favoriteId,
	isInFavorite,
	homeId,
	pathName,
}: AppProps) {
	const { getCountryByValue } = useCountries()
	const country = getCountryByValue(location)

	return (
		<Card className="flex flex-col p-0">
			<div className="relative h-72 aspect-square">
				<Image
					src={`https://otuebdaiujiwlrcgepnk.supabase.co/storage/v1/object/public/images/${imagePath}`}
					alt={"house"}
					fill
					className="rounded-t-lg h-full object-cover "
				/>
				{userId && (
					<div className="z-10 absolute top-2 right-2">
						{isInFavorite ? (
							/* --------------------------- deleteFromFavorite --------------------------- */
							<Form action={deleteFromFavorite}>
								<Input type="hidden" name="favoriteId" value={favoriteId} />
								<Input type="hidden" name="userId" value={userId} />
								<Input type="hidden" name="pathName" value={pathName} />
								<AddToFavoriteButton fill="#f43f5e" />
							</Form>
						) : (
							/* ------------------------------ addToFavorite ----------------------------- */
							<Form action={addToFavorite}>
								<Input type="hidden" name="homeId" value={homeId} />
								<Input type="hidden" name="userId" value={userId} />
								<Input type="hidden" name="pathName" value={pathName} />
								<AddToFavoriteButton />
							</Form>
						)}
					</div>
				)}
			</div>
			<Link href={`/`} className="px-4 pb-4">
				<h3>
					{country?.flag} {country?.label} / {country?.region}{" "}
				</h3>
				<p className="text-muted-foreground line-clamp-2 text-pretty">{description}</p>
				<p className="mt-5 text-muted-foreground">
					<span className="font-medium text-foreground">${price}</span> / Night
				</p>
			</Link>
		</Card>
	)
}
