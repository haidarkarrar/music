import db from "@/drizzle/db"
import { Album, Artist, albums } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { unstable_cache } from "next/cache"


export const getAlbums = unstable_cache(async () => {
    const albums = await db.query.albums.findMany()

    return albums
}, ['get-albums'], {
    tags: ['get-albums'],
})

export const getAlbum = async (albumId: number) => {
    const result = await db.query.albums.findFirst({
        where: eq(albums.id, albumId),
    })

    return result
}
