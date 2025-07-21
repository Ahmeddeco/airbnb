import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function Logo() {
	return (
		<Link href={"/"}>
			<Image
				src={"/icons/airbnb-desktop.png"}
				alt={"logo"}
				width={2560}
				height={800}
				className="w-32 hidden lg:block"
			/>
			<Image
				src={"/icons/airbnb-mobile.webp"}
				alt={"logo"}
				width={577}
				height={600}
				className="w-12 block lg:hidden"
			/>
		</Link>
	)
}
