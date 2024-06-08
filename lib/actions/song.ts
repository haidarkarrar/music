'use server'

import { parseWithZod } from "@conform-to/zod";
import { songSchema } from "../validations/song-validation-schema";
import db from "@/drizzle/db";
import { songs } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";


export const insertSong = async (_: unknown, formData: FormData) => {
    const submission = parseWithZod(formData, {
        schema: songSchema,
    })

    if (submission.status !== 'success') {
        console.log(submission.payload)
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

        revalidatePath("/music/songs")
        return submission.reply()
    } catch (error) {
        return submission.reply()
    }
}