import { z } from 'zod';

const candidateSchema = z.object({
    firstname: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
});

export type CandidateSchema = z.infer<typeof candidateSchema>;

export default candidateSchema;