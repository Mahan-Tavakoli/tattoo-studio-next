import * as z from "zod";

// validation schema

// Shared Client validation base rules

export const ClientInfoValidationSchema = z.object({
  firstName: z
    .string({
      message: "validation.firstNameRequired",
    })
    .min(3, "validation.firstNameMin")
    .max(80, "validation.firstNameMax"),

  lastName: z
    .string({
      message: "validation.lastNameRequired",
    })
    .min(3, "validation.lastNameMin")
    .max(80, "validation.lastNameMax"),

  email: z
    .string({
      message: "validation.emailRequired",
    })
    .email("validation.emailInvalid"),

  phone: z
    .string({
      message: "validation.phoneRequired",
    })
    .min(1, {
      message: "validation.phoneRequired",
    }),
});

// 1. PUBLIC BOOKING SCHEMAS

export const BookingRequestValidationSchema = z.object({
  description: z
    .string()
    .min(1, "validation.tattooDescriptionRequired")
    .max(2000, "validation.tattooDescriptionMax"),

  budgetRange: z
    .string({
      message: "validation.budgetRangeRequired",
    })
    .min(1, "validation.budgetRangeRequired"),

  bookingType: z
    .string({
      message: "validation.bookingTypeRequired",
    })
    .min(1, "validation.bookingTypeRequired"),

  placement: z
    .string()
    .min(1, "validation.placementRequired")
    .max(120, "validation.placementMax"),

  consultDate: z
    .date({
      message: "validation.consultDateRequired",
    })
    .refine((date) => date.getDay() !== 0, {
      message: "validation.consultDateSunday",
    }),

  file: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= 10 * 1024 * 1024, {
          message: "validation.fileSize",
        })
        .refine((file) => file.type.startsWith("image/"), {
          message: "validation.fileType",
        }),
    )
    .max(10, "validation.fileMax"),
});

// Medical Declaration validation

// export const MedicalDeclarationValidationSchema = z.object({
//   hasAllergies: z.boolean({
//     message: "Please answer this question",
//   }),
//   hasSkinCondition: z.boolean({
//     message: "Please answer this question",
//   }),
//   isPregnantOrNursing: z.boolean({
//     message: "Please answer this question",
//   }),
//   hasHeartCondition: z.boolean({
//     message: "Please answer this question",
//   }),
//   hasDiabetes: z.boolean({
//     message: "Please answer this question",
//   }),
//   takesBloodThinners: z.boolean({
//     message: "Please answer this question",
//   }),
//   takesMedication: z.boolean({
//     message: "Please answer this question",
//   }),
//   otherNotes: z
//     .string()
//     .max(1000, "you can describe your medical at most 1000 characters")
//     .optional(),
// });

// consent validation

// export const ConsentValidationSchema = z.object({
//   isAdultConfirmed: z.literal(true, {
//     message: "You must confirm you are 18+",
//   }),

//   termsAccepted: z.literal(true, {
//     message: "You must accept the terms",
//   }),

//   privacyAccepted: z.literal(true, {
//     message: "You must accept the privacy policy",
//   }),
// });

export const BookingAppointmentSchema = z.object({
  client: ClientInfoValidationSchema,
  bookingRequest: BookingRequestValidationSchema,
  // medicalDeclaration: MedicalDeclarationValidationSchema,
  // consent: ConsentValidationSchema,
});

export type BookingAppointmentFormData = z.infer<
  typeof BookingAppointmentSchema
>;

// 2. WALK-IN REGISTER SCHEMAS (Admin Kiosk)
export const WalkInRequestValidationSchema = z.object({
  description: z
    .string()
    .min(1, "validation.tattooDescriptionRequired")
    .max(2000, "validation.tattooDescriptionMax"),

  placement: z
    .string()
    .min(1, "validation.placementRequired")
    .max(120, "validation.placementMax"),

  tattooDate: z.date({
    message: "validation.tattooDateRequired",
  }),

  startsAt: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),

  endsAt: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),

  artistId: z
    .string({
      message: "validation.artistRequired",
    })
    .min(1, "validation.artistSelectionRequired"),

  budgetRange: z
    .string({
      message: "validation.budgetRangeRequired",
    })
    .min(1, "validation.budgetRangeRequired"),
});

export const WalkInBookingSchema = z.object({
  client: ClientInfoValidationSchema,
  bookingRequest: WalkInRequestValidationSchema,
});

export type WalkInBookingFormData = z.infer<typeof WalkInBookingSchema>;
