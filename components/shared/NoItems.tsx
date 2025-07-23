import { FileX } from "lucide-react"
import { Card, CardContent } from "../ui/card"

type Props = {
	title: string
	description: string
}

export default function NoItems({ description, title }: Props) {
	return (
		<Card className="mt-12 h-[60vh]">
			<CardContent className="flex flex-col items-center justify-center gap-4 h-full">
				<FileX className="size-12 text-primary" />
				<h2>{title}</h2>
				<p className="leading-6">{description} </p>
			</CardContent>
		</Card>
	)
}
