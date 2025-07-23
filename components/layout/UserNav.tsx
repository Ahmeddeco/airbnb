import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Menu, Plus, PlusCircle } from "lucide-react"
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import Link from "next/link"
import Form from "next/form"
import { createAirbnbHome } from "@/function/actions"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"

export default async function UserNav() {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="flex items-center gap-4 border rounded-full py-2 lg:px-4 px-2">
					<Menu />
					<Image
						src={user?.picture ?? "/icons/user-round.svg"}
						alt="user"
						width={10}
						height={10}
						className="hidden lg:block rounded-full size-8 object-cover"
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<Form
						action={createAirbnbHome}
						className="w-full"
					>
						<Input
							type={"hidden"}
							name={"userId"}
							value={user?.id}
						/>
						{user ? (
							<Button type="submit">
								<PlusCircle className="text-slate-100" />
								add your home
							</Button>
						) : (
							<Button
								type="button"
								asChild
							>
								<LoginLink> please Login</LoginLink>
							</Button>
						)}
					</Form>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						variant={"outline"}
						asChild
					>
						<Link href={"/my-homes"}>My Listings</Link>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						variant={"outline"}
						asChild
					>
						<Link href={"/favorites"}>My Favorites</Link>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button
						variant={"outline"}
						asChild
					>
						<Link href={"/reservations"}>My Reservations</Link>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{user ? (
					<>
						<DropdownMenuItem>
							<Button
								variant={"secondary"}
								asChild
							>
								<LogoutLink>Logout</LogoutLink>
							</Button>
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuItem>
							<Button
								asChild
								variant={"secondary"}
							>
								<RegisterLink>Register</RegisterLink>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Button
								asChild
								variant={"secondary"}
							>
								<LoginLink>Login</LoginLink>
							</Button>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
