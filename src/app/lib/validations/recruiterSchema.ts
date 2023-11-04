import { z } from 'zod';

const recruiterSchema = z.object({
    societyName: z.string().min(1),
    address: z.string().min(1),
});

export type RecruiterSchema = z.infer<typeof recruiterSchema>;

export default recruiterSchema;
