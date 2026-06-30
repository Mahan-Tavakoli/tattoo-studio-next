import * as z from "zod";
import {
  BOOKING_STATUS,
  BOOKING_STATUS_CANCEL_REASON,
} from "./booking-appointment.types";

export const UpdateStatusValidationSchema = z
  .object({
    status: z.enum(BOOKING_STATUS),

    adminNotes: z.string().optional(),

    cancelReason: z.enum(BOOKING_STATUS_CANCEL_REASON).optional(),

    scheduledDate: z.date({ message: "Schedule date is required" }).optional(),
    artistId: z.string({ message: "Artist must be selected" }).optional(),
    // stationId: z.string().optional(),
    durationNote: z.string().optional(),
    notes: z.string().optional(),
    agreedPriceCents: z.coerce
      .number({
        message: "Price is required",
      })
      .positive("Price must be greater than 0")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === "CANCELLED" && !data.cancelReason) {
      ctx.addIssue({
        path: ["cancelReason"],
        code: z.ZodIssueCode.custom,
        message: "Cancel reason is required",
      });
    }

    if (data.status === "TATTOO_SCHEDULED") {
      if (!data.scheduledDate) {
        ctx.addIssue({
          path: ["scheduledDate"],
          code: z.ZodIssueCode.custom,
          message: "Schedule date is required",
        });
      }

      if (!data.artistId) {
        ctx.addIssue({
          path: ["artistId"],
          code: z.ZodIssueCode.custom,
          message: "Artist must be selected",
        });
      }
    }
  });

export type UpdateStatusFormValues = z.infer<
  typeof UpdateStatusValidationSchema
>;
