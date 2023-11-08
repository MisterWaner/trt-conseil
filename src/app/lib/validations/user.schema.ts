import { z } from "zod";

export const RegisterUserSchema = z
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
        role: z.string().min(1, { message: "Veuillez renseigner votre rôle" }),
    })
    .refine((data) => data.password === data.confirmation, {
        message: "Le mot de passe et la confirmation ne correspondent pas",
        path: ["confirmation"],
    });

export const LoginUserSchema = z.object({
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

export const UpdateUserSchema = z.object({
    firstname: z
        .string()
        .min(2, {
            message: "Votre prénom doit contenir au minimum 2 caractères",
        })
        .max(50, {
            message: "Votre prénom doit contenir au maximum 50 caractères",
        }),
    lastname: z
        .string()
        .min(2, { message: "Votre nom doit contenir au minimum 2 caractères" })
        .max(50, {
            message: "Votre nom doit contenir au maximum 50 caractères",
        }),
    societyName: z
        .string()
        .min(3, {
            message:
                "Le nom de votre entreprise doit contenir au minimum 3 caractères",
        })
        .max(100, {
            message:
                "Le nom de votre société doit contenir au maximum 100 caractères",
        }),
    address: z
        .string()
        .min(3, {
            message: "Votre adresse doit contenir au minimum 3 caractères",
        })
        .max(100, {
            message: "Votre adresse doit contenir au maximum 100 caractères",
        }),
});

export type RegisterUserSchema = z.infer<typeof RegisterUserSchema>;
export type LoginUserSchema = z.infer<typeof LoginUserSchema>;
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;

