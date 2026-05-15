import * as z from "zod";

export const StationConfigValidationSchema = z.object({
  totalTables: z.coerce
    .number({ message: "Number of tables is required" })
    .min(1, "Please define number of tables"),
  pricePerDay: z.coerce
    .number({ message: "Price per day is required" })
    .min(1, "Please define price per day"),
  monthlyDiscountPercent: z.coerce
    .number({ message: "Monthly discount percent is required" })
    .min(1, "Please define monthly discount percent"),
});

export type StationConfig = z.infer<typeof StationConfigValidationSchema>;
