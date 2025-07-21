import Form from "next/form"
import {categoryItems} from "@/constant/categoryItems"
import Image from "next/image"


export default async function MapFilterItems({
                                               searchParams,
                                             }: {
  searchParams: Promise<{ category: string }>;
}) {
  const category = (await searchParams).category

  console.log("category from MapFilterItems", category)
  return (
    <div className="flex gap-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {categoryItems.map(({id, imageUrl, name, title}) => (
        <Form
          action={""}
          key={id}>
          <input
            type="hidden"
            name="category"
            value={name}
          />
          <button
            type="submit"
            className={`${
              category === name ? "underline underline-offset-2 " : "opacity-70"
            } flex flex-col items-center gap-2 cursor-pointer `}>
            <div className="relative size-6">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className=""
              />
            </div>
            <p className="text-xs font-medium capitalize">{name}</p>
          </button>
        </Form>
      ))}
    </div>
  )
}
