import Link from "next/link"
import { Button } from "../ui/button"
import CreationSubmit from "./CreationSubmit"

export default function CreationBottomBar() {
	return (
		<div className="fixed w-full bottom-0 inset-x-0 z-10 bg-white border-t h-24 ">
			<div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full w-full ">
				<Button
					asChild
					variant={"secondary"}
					size={"lg"}>
					<Link href={"/"}>Cancel</Link>
				</Button>
				<CreationSubmit />
			</div>
		</div>
	)
}
