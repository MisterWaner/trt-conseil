import { z } from "zod";

const registerSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: "Veuillez renseigner votre adresse email" })
            .email({ message: "Votre adresse email est invalide" })
            .toLowerCase()
            .trim(),
        password: z
            .string({})
            .min(8, {
                message: "Votre mot de passe doit faire 8 caractères minimum",
            })
            .max(20, {
                message: "Votre mot de passe doit faire 20 caractères maximum",
            }),
        confirmation: z
            .string()
            .min(8, {
                message: "Votre mot de passe doit faire 8 caractères minimum",
            })
            .max(20, {
                message: "Votre mot de passe doit faire 20 caractères maximum",
            }),
        role: z.string().min(1, { message: "Veuillez renseigner votre rôle" })
    })
    .refine((data) => data.password === data.confirmation, {
        message: "Le mot de passe et la confirmation ne correspondent pas",
        path: ["confirmation"],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;

export { registerSchema };