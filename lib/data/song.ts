import db from "@/drizzle/db";
import { songs, Song, artists, albums } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getSongs = unstable_cache(async () => {
    const result = await db.select({
        id: songs.id,
        name: songs.name,
        image: songs.image,
        songUrl: songs.songUrl,
        artistId: songs.artistId,
        albumId: songs.albumId,
        album: {
            id: albums.id,
            name: albums.name,
            image: albums.image,
            artistId: albums.artistId,
        },
        artist: {
            id: artists.id,
            name: artists.name,
            image: artists.image,
        },
    })
        .from(songs)
        .leftJoin(artists, eq(songs.artistId, artists.id))
        .leftJoin(albums, eq(songs.albumId, albums.id))

    return result;
}, ['get-songs'], {
    tags: ['get-songs'],
})

export async function getSong(id: number) {
    const result = await db.query.songs.findFirst({
        where: eq(songs.id, id)
    });

    return result;
}

export async function getSongsByArtist(artistId: number) {
    const result = await db.query.songs.findMany({
        with: {
            album: true,
        },
        where: eq(artists.id, artistId)
    });

    return result;
}

export async function getSongsByAlbum(albumId: number) {
    const result = await db.query.songs.findMany({
        with: {
            artist: true,
        },
        where: eq(albums.id, albumId)
    });

    return result;
}