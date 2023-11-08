import { z } from 'zod';

export const resumeSchema = z.object({
    name: z.string().min(1),
    path: z.string().min(1).trim(),
});

export type ResumeSchema = z.infer<typeof resumeSchema>;
