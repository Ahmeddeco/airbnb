import SelectedCategory from "@/components/shared/SelectedCategory"
import { Button } from "@/components/ui/button"
import Form from "next/form"
import Link from "next/link"

export default function StructurePage() {
	return (
		<>
			<div className="w-3/5 mx-auto">
				<h2 className="text-3xl font-semibold tracking-tight transition-colors">
					Which of these best describe your Home!
				</h2>
			</div>
			<Form action={""}>
				<SelectedCategory />
				<div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
					<div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full ">
						<Button
							asChild
							variant={"secondary"}
							size={"lg"}>
							<Link href={"/"}>Cancel</Link>
						</Button>
						<Button size={"lg"}>save</Button>
					</div>
				</div>
			</Form>
		</>
	)
}
