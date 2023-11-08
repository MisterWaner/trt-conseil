import { z } from "zod";

export const offerSchema = z.object({
    title: z.string().min(1, { message: "Le titre est obligatoire" }),
    salary: z
        .number()
        .min(1, { message: "Le salaire est obligatoire" })
        .positive({ message: "Le salaire doit être positif" }),
    place: z.string().min(1, { message: "Le lieu est obligatoire" }),
    schedules: z.string().min(1, { message: "Les horaires sont obligatoires" }),
    contractType: z
        .string()
        .min(1, { message: "Le type de contrat est obligatoire" }),
});

export type OfferSchema = z.infer<typeof offerSchema>;
