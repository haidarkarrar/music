'use server'

import { parseWithZod } from "@conform-to/zod";
import { songSchema } from "../validations/song-validation-schema";
import db from "@/drizzle/db";
import { songs } from "@/drizzle/schema";
import { revalidateTag } from "next/cache";


export const insertSong = async (_: unknown, formData: FormData) => {
    const submission = parseWithZod(formData, {
        schema: songSchema,
    })

    if (submission.status !== 'success') {
        return submission.reply();
    }
    const { name, image, songUrl, albumId, artistId } = submission.value

    try {
        await db.insert(songs).values({
            name,
            image,
            songUrl,
            albumId: parseInt(albumId),
            artistId: parseInt(artistId),
        })

        revalidateTag("get-songs")
        return submission.reply()
    } catch (error) {
        return submission.reply()
    }
}