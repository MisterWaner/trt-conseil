import { z } from "zod";

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(25),
    roleId: z.number().min(1).max(3),
})

export default userSchema;