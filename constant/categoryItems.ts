import amazingView from "@/public/icons/category/amazingView.webp"
import beach from '@/public/icons/category/beach.webp'
import beachfront from '@/public/icons/category/beachfront.webp'
import countryside from '@/public/icons/category/countryside.webp'
import design from '@/public/icons/category/design.webp'
import earthhome from '@/public/icons/category/earthhome.webp'
import historic from '@/public/icons/category/historic.webp'
import luxe from '@/public/icons/category/luxe.webp'
import omg from '@/public/icons/category/omg.webp'
import pool from '@/public/icons/category/pool.webp'
import surfing from '@/public/icons/category/surfing.webp'
import tiny from '@/public/icons/category/tiny.webp'
import trending from '@/public/icons/category/trending.webp'

interface iAppProps {
  name: string
  title: string
  imageUrl: any
  description: string
  id: number
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "beach",
    description: "This Property is close to the Beach.",
    title: "Beach",
    imageUrl:beach
  },
  {
    id: 1,
    name: "trending",
    description: "This is a Property which is trending.",
    title: "Trending",
    imageUrl: trending
  },
  {
    id: 2,
    name: "beachfront",
    description: "This is a Property is close to the beachfront",
    title: "Beachfront",
    imageUrl: beachfront
  },
  {
    id: 3,
    name: "earthhome",
    description: "This Property is considerd a Earth Home",
    title: "Earth Home",
    imageUrl: earthhome
  },
  {
    id: 4,
    name: "luxe",
    description: "This Property is considerd Luxorious",
    title: "Luxe",
    imageUrl: luxe
  },
  {
    id: 5,
    name: "amazingView",
    description: "This property has an amazing View",
    title: "Amazing View",
    imageUrl: amazingView
  },
  {
    id: 6,
    name: "design",
    description: "This property puts a big focus on design ",
    title: "Design",
    imageUrl: design
  },
  {
    id: 7,
    name: "pool",
    description: "This property has an amazing Pool",
    title: "Pool",
    imageUrl: pool
  },
  {
    id: 8,
    name: "tiny",
    description: "This property is considered a tiny home",
    title: "Tiny Home",
    imageUrl: tiny
  },
  {
    id: 9,
    name: "historic",
    description: "This Property is considered historic",
    title: "Historic Home",
    imageUrl: historic
  },
  {
    id: 10,
    name: "countryside",
    description: "This Property is located on the countryside",
    title: "Countryside",
    imageUrl: countryside
  },
  {
    id: 11,
    name: "omg",
    description: "This Property has a wow factor",
    title: "WOW!",
    imageUrl: omg
  },
  {
    id: 12,
    name: "surfing",
    description: "This Property is located near to a surfing spot",
    title: "Surfing",
    imageUrl: surfing
  },
]
