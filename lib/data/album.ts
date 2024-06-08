import db from "@/drizzle/db"
import { Album, Artist, albums } from "@/drizzle/schema"
import { eq } from "drizzle-orm"


export const getAlbums = async () => {
    const albums = await db.query.albums.findMany()

    return albums
}

export const getAlbum = async (albumId: number) => {
    const result = await db.query.albums.findFirst({
        where: eq(albums.id, albumId),
    })

    return result
}
