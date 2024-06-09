'server-only'

import db from "@/drizzle/db"
import { artists } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { unstable_cache } from "next/cache"


export const getArtists = unstable_cache(async () => {
    const result = await db.query.artists.findMany()

    return result
}, ['get-artists'], {
    tags: ['get-artists'],
})

export const getArtist = async (artistId: number) => {
    const result = await db.query.artists.findFirst({
        where: eq(artists.id, artistId),
        with: {
            songs: true,
            albums: true,
        }
    })

    return result
}

