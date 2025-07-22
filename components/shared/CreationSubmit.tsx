"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

export default function CreationSubmit() {
	const { pending } = useFormStatus()

	return (
		<>
			{pending ? (
				<Button
					disabled
					size={"lg"}
				>
					<Loader2 className="animate-spin" /> please wait
				</Button>
			) : (
				<Button
					type="submit"
					size={"lg"}
				>
					Next
				</Button>
			)}
		</>
	)
}
