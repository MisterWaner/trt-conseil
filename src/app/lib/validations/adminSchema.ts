import { z } from "zod";

const adminSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Veuillez renseigner votre adresse email" })
        .email({ message: "Votre adresse email est invalide" })
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(8, {
            message: "Votre mot de passe doit faire 8 caractères minimum",
        })
        .max(25, {
            message: "Votre mot de passe doit faire 25 caractères maximum",
        }),
});

export type AdminSchema = z.infer<typeof adminSchema>;

export default adminSchema;