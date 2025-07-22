"use client"

import CreationBottomBar from "@/components/shared/CreationBottomBar"
import Map from "@/components/shared/Map"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { createLocation } from "@/function/create"
import { useCountries } from "@/lib/getCountries"
import dynamic from "next/dynamic"
import Form from "next/form"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function AddressPage() {
	const { getAllCountries } = useCountries()
	const params = useParams()
	const id = params.id

	const [locationValue, setLocationValue] = useState("")

	const LazyMap = dynamic(() => import("@/components/shared/Map"), {
		ssr: false,
		loading: () => <Skeleton className="h-[50vh] w-full" />,
	})

	return (
		<>
			<div className="w-3/5 mx-auto">
				<h2 className="mb-10">Where is your Home</h2>
			</div>
			<Form action={createLocation}>
				<Input
					type="hidden"
					name="homeId"
					value={id}
				/>
				<Input
					type="hidden"
					name="countryValue"
					value={locationValue}
				/>
				<div className="w-3/5 mx-auto mb-36">
					<div className="mb-5 ">
						<Select
							required
							onValueChange={(value) => setLocationValue(value)}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a country" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>countries</SelectLabel>
									{getAllCountries().map((country) => (
										<SelectItem
											key={country.value}
											value={country.value}
										>
											{country.flag} {country.label} / {country.region}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<LazyMap locationValue={locationValue} />
				</div>
				<CreationBottomBar />
			</Form>
		</>
	)
}
