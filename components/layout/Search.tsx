"use client"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog"
import { SearchIcon } from "lucide-react"
import Form from "next/form"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { useCountries } from "@/lib/getCountries"
import HomeMap from "../shared/HomeMap"
import { Button } from "../ui/button"
import { CreationSubmit } from "../shared/SubmitButtons"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Counter from "../shared/Counter"
import { Input } from "../ui/input"

export default function Search() {
	const [step, setStep] = useState(1)
	const [locationValue, setLocationValue] = useState("")

	function SubmitButtonLocal() {
		if (step === 1) {
			return (
				<Button onClick={() => setStep(step + 1)} type="button">
					next
				</Button>
			)
		} else if (step === 2) {
			return <CreationSubmit />
		}
	}

	const { getAllCountries } = useCountries()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="rounded-full py-2 px-5 border flex items-center cursor-pointer bg-card">
					<div className="flex h-full divide-x ">
						<p className="px-4 font-medium capitalize">Any where</p>
						<p className="px-4 font-medium capitalize">any week</p>
						<p className="px-4 font-medium capitalize">add guests</p>
					</div>
					<SearchIcon className="text-primary" />
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<Form action={"/search"} className="flex flex-col gap-4 ">
					<Input type="hidden" name="locationValue" value={locationValue} />
					{step === 1 ? (
						<>
							<DialogHeader>
								<DialogTitle>Select a Country</DialogTitle>
								<DialogDescription>Please choose a Country, so that what you want</DialogDescription>
							</DialogHeader>
							<Select required onValueChange={(value) => setLocationValue(value)} value={locationValue}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a country" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>countries</SelectLabel>
										{getAllCountries().map((country) => (
											<SelectItem key={country.value} value={country.value}>
												{country.flag} {country.label} / {country.region}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<HomeMap locationValue={locationValue} />
						</>
					) : (
						<>
							<DialogHeader>
								<DialogTitle>Select All the info you need</DialogTitle>
								<DialogDescription>Please choose a Country, so that what you want</DialogDescription>
							</DialogHeader>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center justify-between">
										Guests
										<Counter name="guests" />
									</CardTitle>
									<CardDescription>How many guests do you want?</CardDescription>
								</CardHeader>
							</Card>

							{/* ---------------------------------- rooms --------------------------------- */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center justify-between">
										rooms
										<Counter name="rooms" />
									</CardTitle>
									<CardDescription>How many rooms do you want?</CardDescription>
								</CardHeader>
							</Card>

							{/* -------------------------------- bathrooms ------------------------------- */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center justify-between">
										bathrooms
										<Counter name="bathrooms" />
									</CardTitle>
									<CardDescription>How many bathrooms do you want?</CardDescription>
								</CardHeader>
							</Card>
						</>
					)}
					<DialogFooter>
						<SubmitButtonLocal />
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
