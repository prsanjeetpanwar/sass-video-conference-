import { z } from "zod";

export const agentsInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    instructions: z.string().min(1, { message: "Instructions is required" })
});

// Explicitly export the type for better TypeScript inference
export type AgentsInsert = z.infer<typeof agentsInsertSchema>;