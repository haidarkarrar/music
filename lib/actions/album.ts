'use server'

import db from "@/drizzle/db"
import { Album, Artist, albums } from "@/drizzle/schema"
import { parseWithZod } from "@conform-to/zod"
import { eq } from "drizzle-orm"
import { albumSchema } from "../validations/album-validation-schema"
import { revalidatePath } from "next/cache"


export const insertAlbum = async (_: any, formData: FormData) => {
    const submission = parseWithZod(formData, {
        schema: albumSchema,
    })

    if (submission.status !== 'success') {
        return submission.reply();
    }
    const { name, image, artistId } = submission.value

    try {
        await db.insert(albums).values({
            name,
            image,
            artistId: parseInt(artistId),
        })

        revalidatePath("/music/albums")
    } catch (error) {
        return submission.reply();
    }

    return submission.reply();
}

export const updateAlbum = async (_: any, formData: FormData) => {
    const rawFormData = {
        name: formData.get("name") as Album["name"],
        artistId: formData.get("artistId") as unknown as Artist["id"],
    }

    const { name, artistId } = rawFormData

    try {
        await db.update(albums).set({
            name,
            artistId,
        }).where(eq(albums.id, 1))
    } catch (error) {
        return {
            success: false,
            error: 'Failed to update album',
            status: 500,
        }
    }

    return {
        success: true,
        error: null,
        status: 200,
    }
}

export const deleteAlbum = async (_: any, formData: FormData) => {
    const rawFormData = {
        id: formData.get("id") as unknown as Album["id"],
    }

    const { id } = rawFormData

    try {
        await db.delete(albums).where(eq(albums.id, id))
    } catch (error) {
        return {
            success: false,
            error: 'Failed to delete album',
            status: 500,
        }
    }

    return {
        success: true,
        error: null,
        status: 200,
    }
}