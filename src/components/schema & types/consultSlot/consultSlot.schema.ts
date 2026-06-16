import { z } from "zod";

export const consultSlotSchema = z.object({
  dates: z
    .array(z.string())
    .min(1, "At least one date is required"),

  maxCount: z.coerce
    .number()
    .int("Maximum count must be an integer")
    .positive("Maximum count must be greater than 0"),
});

export type ConsultSlotFormValues = z.infer<
  typeof consultSlotSchema
>;