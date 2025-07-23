"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Heart, Loader2 } from "lucide-react"

/* ----------------------------- CreationSubmit ----------------------------- */
export function CreationSubmit() {
	const { pending } = useFormStatus()

	return (
		<>
			{pending ? (
				<Button disabled size={"lg"}>
					<Loader2 className="animate-spin" /> please wait
				</Button>
			) : (
				<Button type="submit" size={"lg"}>
					Next
				</Button>
			)}
		</>
	)
}

/* --------------------------- AddToFavoriteButton -------------------------- */
export const AddToFavoriteButton = ({ fill }: { fill?: string }) => {
	const { pending } = useFormStatus()

	return (
		<>
			{pending ? (
				<Button size={"icon"} variant={"outline"} disabled className="bg-primary-foreground">
					<Loader2 className="animate-spin text-primary" />
				</Button>
			) : (
				<Button variant={"outline"} size={"icon"} className="bg-primary-foreground" type="submit">
					<Heart fill={fill ? fill : "none"} stroke="#f43f5e" strokeWidth={2} />
				</Button>
			)}
		</>
	)
}
