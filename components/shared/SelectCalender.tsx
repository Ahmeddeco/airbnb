"use client"

import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange } from "react-date-range"
import { useState } from "react"
import { Input } from "../ui/input"
import { eachDayOfInterval } from "date-fns"

type Props = {
	reservation:
		| {
				startDate: Date
				endDate: Date
		  }[]
		| undefined
}

export default function SelectCalender({ reservation }: Props) {
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		},
	])

	let disabledDate: Date[] = []
	reservation?.forEach((reservationItem) => {
		const dateRange = eachDayOfInterval({
			start: new Date(reservationItem.startDate),
			end: new Date(reservationItem.endDate),
		})
		disabledDate = [...disabledDate, ...dateRange]
	})
	console.log("disabledDate", disabledDate)
	return (
		<>
			<Input type="hidden" name="startDate" value={state[0].startDate.toISOString()} />
			<Input type="hidden" name="endDate" value={state[0].endDate.toISOString()} />
			<DateRange
				date={new Date()}
				showDateDisplay={false}
				rangeColors={["#f43f5e"]}
				ranges={state}
				onChange={(item) => setState([item.selection as any])}
				minDate={new Date()}
				direction="vertical"
				disabledDates={disabledDate}
				className="rounded-lg shadow-md"
			/>
		</>
	)
}
