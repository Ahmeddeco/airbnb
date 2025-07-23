import Counter from "@/components/shared/Counter"
import CreationBottomBar from "@/components/shared/CreationBottomBar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createDescription } from "@/function/actions"
import Form from "next/form"

export default async function DescriptionPage({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id

	return (
		<>
			<div className="w-3/5 mx-auto">
				<h2 className="text-3xl font-semibold tracking-tight transition-colors">Please describe your home.</h2>
				<Form
					action={createDescription}
					className="pb-32 relative"
				>
					<Input
						type="hidden"
						name="homeId"
						value={id}
					/>
					<div className="mx-auto mt-10 flex flex-col gap-y-5">
						{/* ---------------------------------- title --------------------------------- */}
						<div className="flex flex-col gap-y-2 ">
							<Label>title</Label>
							<Input
								name="title"
								type="text"
								required
								placeholder="Short and simple..."
							/>
						</div>

						{/* ------------------------------- description ------------------------------ */}
						<div className="flex flex-col gap-y-2 ">
							<Label>description</Label>
							<Textarea
								name="description"
								required
								placeholder="Please describe your home..."
							/>
						</div>

						{/* ---------------------------------- price --------------------------------- */}
						<div className="flex flex-col gap-y-2 ">
							<Label>price</Label>
							<Input
								name="price"
								type="number"
								required
								placeholder="Price per night in USD."
								min={10}
							/>
						</div>

						{/* --------------------------------- images --------------------------------- */}
						<div className="flex flex-col gap-y-2 ">
							<Label>images</Label>
							<Input
								name="images"
								type="file"
								required
							/>
						</div>

						{/* --------------------------------- Guests --------------------------------- */}
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
					</div>
					<CreationBottomBar />
				</Form>
			</div>
		</>
	)
}
