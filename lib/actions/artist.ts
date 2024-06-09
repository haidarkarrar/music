'use server'

import db from "@/drizzle/db"
import { Artist, artists } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { parseWithZod } from '@conform-to/zod';
import { artistSchema } from "../validations/artist-validation-schema";
import { revalidateTag } from "next/cache";


export const insertArtist = async (_: unknown, formData: FormData) => {
    const submission = parseWithZod(formData, {
        schema: artistSchema,
    })

    if (submission.status !== 'success') {
        return submission.reply();
    }
    const { name, image } = submission.value

    try {
        await db.insert(artists).values({
            name,
            image,
        })

        revalidateTag("get-artists")
        return submission.reply()
    } catch (error) {
        return submission.reply()
    }
}

export const updateArtist = async (_: unknown, formData: FormData) => {
    const rawFormData = {
        name: formData.get("name") as Artist["name"],
        imageUrl: formData.get("fileImage") as Artist["image"],
    }

    const { name, imageUrl } = rawFormData

    try {
        await db.update(artists).set({
            name,
            image: imageUrl,
        }).where(eq(artists.id, 1))
    } catch (error) {
        return {
            success: false,
            error: 'Failed to update artist',
            status: 500,
        }
    }

    return {
        success: true,
        error: null,
        status: 200,
    }
}

export const deleteArtist = async (_: unknown, formData: FormData) => {
    const rawFormData = {
        id: formData.get("id") as unknown as Artist["id"],
    }

    const { id } = rawFormData

    try {
        await db.delete(artists).where(eq(artists.id, id))
    } catch (error) {
        return {
            success: false,
            error: 'Failed to delete artist',
            status: 500,
        }
    }

    return {
        success: true,
        error: null,
        status: 200,
    }
}