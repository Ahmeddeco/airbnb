"use client"

import { categoryItems } from "@/constant/categoryItems"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
import { useState } from "react"

type Props = {}

export default function SelectedCategory({}: Props) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 gap-4 mt-10 mx-auto lg:w-3/5 w-full px-8 mb-36">
			{categoryItems.map(({ description, id, imageUrl, name, title }) => (
				<div
					className="cursor-pointer"
					key={id}>
					<Card
						className={selectedCategory === name ? "border-primary" : ""}
						onClick={() => setSelectedCategory(name)}>
						<CardHeader>
							<Image
								src={imageUrl}
								alt={name}
								height={32}
								width={32}
								className="size-8"
							/>
							<h3 className="font-medium">{title}</h3>
						</CardHeader>
						<CardContent></CardContent>
					</Card>
				</div>
			))}
		</div>
	)
}
