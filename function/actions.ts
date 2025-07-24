'use server'

import { prisma } from "@/lib/prisma"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


/* ---------------------------- createAirbnbHome ---------------------------- */
export const createAirbnbHome = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  try {

    await prisma.home.create({
      data: {
        userId: data.userId as string
      }
    })
  } catch (error) {
    console.error(error)

  }

  const homeId = await prisma.home.findMany({
    where: {
      userId: data.userId as string
    },
    orderBy: { createdAt: "desc" }, select: { id: true }
  })
  const lastHomeId = homeId[ 0 ].id as string
  redirect(`/create/${lastHomeId}/structure`)
}

/* ----------------------------- createCategory ----------------------------- */
export const createCategory = async (formData: FormData) => {
  const inputData = Object.fromEntries(formData)


  try {
    await prisma.home.update({
      where: { id: inputData.homeId as string },
      data: {
        categoryName: inputData.categoryName as string,
        addedCategory: true,
        userId: inputData.userId as string
      },
    })
  } catch (error) {
    console.error(error)
  }
  redirect(`/create/${inputData.homeId}/description`)
}

/* ---------------------------- createDescription --------------------------- */
export const createDescription = async (formData: FormData) => {
  const rawData = Object.fromEntries(formData)

  const imageFile = formData.get('images')
  let imageData: any = null
  if (imageFile instanceof File) {
    const { data, error } = await supabase.storage.from("images").upload(
      `${imageFile.name}-${Date.now()}`,
      imageFile, {
      cacheControl: '3600',
      contentType: "image/png"
    }
    )
    if (error) {
      throw error
    }
    imageData = data
  } else {
    console.error('Invalid image file')
  }

  try {
    await prisma.home.update({
      where: { id: rawData.homeId as string },
      data: {
        title: rawData.title as string,
        description: rawData.description as string,
        price: rawData.price as string,
        guests: rawData.guests as string,
        bedrooms: rawData.rooms as string,
        bathrooms: rawData.bathrooms as string,
        photo: imageData?.path,
        addedDescription: true
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect(`/create/${rawData.homeId}/address`)
}

/* ----------------------------- createLocation ----------------------------- */
export const createLocation = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  try {
    await prisma.home.update({
      where: { id: data.homeId as string },
      data: {
        addedLocation: true,
        country: data.countryValue as string
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/")
}

/* ------------------------------ addToFavorite ----------------------------- */
export const addToFavorite = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  try {
    await prisma.favorite.create({
      data: {
        userId: data.userId as string,
        homeId: data.homeId as string
      }
    })
  } catch (error) {
    console.error(error)
  }
  revalidatePath(data.pathName as string)
}


/* --------------------------- deleteFromFavorite --------------------------- */
export const deleteFromFavorite = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  try {
    await prisma.favorite.delete({
      where: {
        id: data.favoriteId as string,
        userId: data.userId as string
      }
    })
  } catch (error) {
    console.error(error)
  }
  revalidatePath(data.pathName as string)
}

/* ---------------------------- createReservation --------------------------- */
export const createReservation = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  console.log('data from createReservation', data)

  try {
    await prisma.reservation.create({
      data: {
        userId: data.userId as string,
        homeId: data.homeId as string,
        startDate: data.startDate as string,
        endDate: data.endDate as string,
      }
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/")
}