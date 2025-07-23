import ThemeButton from "../theme/ThemeButton"
import Logo from "./Logo"
import UserNav from "./UserNav"

export default function Navbar() {
	return (
		<header className="w-full border-b">
			<div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
				<Logo />
				<div className="rounded-full border px-5 py-2">
					<h1>Hello from the search</h1>
				</div>
				<div className="flex items-center gap-4">
					<ThemeButton />
					<UserNav />
				</div>
			</div>
		</header>
	)
}
