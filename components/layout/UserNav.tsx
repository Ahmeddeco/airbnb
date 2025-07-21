import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {Menu} from "lucide-react"
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import Link from "next/link"
import Form from "next/form"
import {createAirbnbHome} from "@/function/create"
import {Input} from "@/components/ui/input"


export default async function UserNav() {
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-4 border rounded-full py-2 lg:px-4 px-2">
          <Menu/>
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
          <Form action={createAirbnbHome}>
            <Input type={"hidden"} name={"userId"} value={user?.id}/>
            <button
              type="submit"
              className="capitalize text-start">
              airbnb your home
            </button>
          </Form>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/my-homes"}>My Listings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/favorites"}>My Favorites</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/reservations"}>My Reservations</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        {user ? (
          <>
            <DropdownMenuItem>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <RegisterLink>Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LoginLink>Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
