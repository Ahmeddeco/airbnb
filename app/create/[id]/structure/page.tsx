import CreationBottomBar from "@/components/shared/CreationBottomBar"
import SelectedCategory from "@/components/shared/SelectedCategory"
import { Input } from "@/components/ui/input"
import { createCategory } from "@/function/actions"
import Form from "next/form"

export default async function StructurePage({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id
	return (
		<>
			<div className="w-3/5 mx-auto">
				<h2 className="text-3xl font-semibold tracking-tight transition-colors">
					Which of these best describe your Home!
				</h2>
			</div>
			<Form action={createCategory}>
				<Input
					type="hidden"
					name="homeId"
					value={id}
				/>
				<SelectedCategory />
				<CreationBottomBar />
			</Form>
		</>
	)
}
