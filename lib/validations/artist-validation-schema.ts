import { z } from "zod";

export const artistSchema = z.object({
    name: z.string().min(1),
    image: z.string().min(1),
})