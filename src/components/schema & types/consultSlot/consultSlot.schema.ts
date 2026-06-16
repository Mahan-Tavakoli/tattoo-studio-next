import { z } from "zod";

export const consultSlotSchema = z.object({
  dateRange: z
    .object({
      from: z.date({
        message: "Start date is required",
      }),
      to: z.date({
        message: "End date is required",
      }),
    })
    .refine((value) => value.from && value.to, {
      message: "Please select a complete date range",
    }),

  maxCount: z.coerce
    .number()
    .int("Maximum count must be an integer")
    .positive("Maximum count must be greater than 0"),
});

export type ConsultSlotFormValues = z.infer<typeof consultSlotSchema>;
