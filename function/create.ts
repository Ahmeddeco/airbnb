'use server'

import {prisma} from "@/lib/prisma"
import {redirect} from "next/navigation"


export const createAirbnbHome = async (formData: FormData) => {
  const userId = formData.get('userId') as string

  try {
    const data = await prisma.home.findFirst({
      where: {userId: userId},
      orderBy: {createdAt: "desc"}
    })

    if (data === null) {
      const data = await prisma.home.create({
        data: {
          userId: userId
        }
      })
      redirect(`/create/${userId}/structure`)
    } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
      redirect(`/create/${userId}/structure`)
    } else if (data.addedCategory && !data.addedDescription) {
      redirect(`/create/${userId}/description`)
    }
  } catch (error) {
    console.error(error)
  }
}

