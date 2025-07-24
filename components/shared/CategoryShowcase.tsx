import React from "react"
import { categoryItems } from "@/constant/categoryItems"

type Props = {
	categoryName: string
}

export default function CategoryShowcase({ categoryName }: Props) {
	const category = categoryItems.find((item) => item.name === categoryName)

	return (
		<div className="flex items-center gap-4 ">
			{React.createElement(category?.icon!)}
			<div className="flex flex-col gap-0.5 ">
				<h3>{category?.title!}</h3>
				<p>{category?.description!}</p>
			</div>
		</div>
	)
}
