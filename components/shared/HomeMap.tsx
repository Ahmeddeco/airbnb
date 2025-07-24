"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "../ui/skeleton"

type Props = {
	locationValue: string
}

export default function HomeMap({ locationValue }: Props) {
	const LazyMap = dynamic(() => import("@/components/shared/Map"), {
		ssr: false,
		loading: () => <Skeleton className="h-[50vh] w-full" />,
	})
	return <LazyMap locationValue={locationValue} />
}
