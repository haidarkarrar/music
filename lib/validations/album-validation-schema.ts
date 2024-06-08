import { z } from "zod";

export const albumSchema = z.object({
    name: z.string().min(1),
    image: z.string().min(1),
    artistId: z.string().min(1),
})