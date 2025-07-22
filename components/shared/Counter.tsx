"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { Input } from "../ui/input"

export default function Counter({ name }: { name: string }) {
	const [amount, setAmount] = useState(0)

	function addAmount() {
		setAmount(amount + 1)
	}

	function removeAmount() {
		if (amount > 0) {
			setAmount(amount - 1)
		}
	}

	return (
		<div className="flex items-center gap-6">
			<Input
				type="hidden"
				name={name}
				value={amount}
			/>
			<Button
				size={"icon"}
				type="button"
				variant={"outline"}
				disabled={amount === 0}
				onClick={() => removeAmount()}
			>
				<Minus />
			</Button>
			<h6 className="font-semibold lg:text-2xl text-lg">{amount}</h6>
			<Button
				size={"icon"}
				type="button"
				variant={"outline"}
				onClick={() => addAmount()}
			>
				<Plus />
			</Button>
		</div>
	)
}
