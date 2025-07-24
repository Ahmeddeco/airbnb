"use client"

import { categoryItems } from "@/constant/categoryItems"
import { Card, CardHeader } from "../ui/card"
import Image from "next/image"
import React, { useState } from "react"
import { Input } from "../ui/input"
import { icon } from "leaflet"

export default function SelectedCategory() {
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 gap-4 mt-10 mx-auto lg:w-3/5 w-full px-8 mb-36">
			<Input
				type="hidden"
				name="categoryName"
				value={selectedCategory ?? ""}
			/>
			{categoryItems.map(({ id, icon, name, title }) => (
				<div
					className="cursor-pointer"
					key={id}
				>
					<Card
						className={selectedCategory === name ? "border-primary" : ""}
						onClick={() => setSelectedCategory(name)}
					>
						<CardHeader className="flex flex-col items-center gap-2">
							{React.createElement(icon!)}
							<h3 className="font-medium">{title}</h3>
						</CardHeader>
					</Card>
				</div>
			))}
		</div>
	)
}
