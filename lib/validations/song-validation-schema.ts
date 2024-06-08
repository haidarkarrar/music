import { z } from "zod";

export const songSchema = z.object({
    name: z.string().min(1),
    image: z.string().min(1),
    songUrl: z.string().min(1),
    albumId: z.string().min(1),
    artistId: z.string().min(1),
})