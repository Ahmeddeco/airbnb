import Form from "next/form"
import { categoryItems } from "@/constant/categoryItems"
import React from "react"

export default async function MapFilterItems({ searchParams }: { searchParams: Promise<{ category: string }> }) {
	const category = (await searchParams).category

	return (
		<div className="flex items-center justify-center gap-10 mt-5 w-full overflow-x-scroll no-scrollbar">
			{categoryItems.map(({ id, name, icon }) => (
				<Form
					action={""}
					key={id}
				>
					<input
						type="hidden"
						name="category"
						value={name}
					/>
					<button
						type="submit"
						className={`${
							category === name ? "underline underline-offset-2 " : "opacity-70"
						} flex flex-col items-center gap-2 cursor-pointer `}
					>
						{React.createElement(icon)}
						<p className="text-xs font-medium capitalize">{name}</p>
					</button>
				</Form>
			))}
		</div>
	)
}
