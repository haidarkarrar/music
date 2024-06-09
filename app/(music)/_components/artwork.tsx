import Image from "next/image"

import { cn } from "@/lib/utils"
import { Album } from "../_data/albums"

interface ArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  cover: string
  name: string
  desc: string
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function Artwork({
  cover,
  name,
  desc,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={cover}
          alt={name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{name}</h3>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}