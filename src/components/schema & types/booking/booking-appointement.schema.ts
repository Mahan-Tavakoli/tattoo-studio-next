import * as z from "zod";

// validation schema

// Shared Client validation base rules

export const ClientInfoValidationSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .min(3, "First name must be at least 3 characters")
    .max(80, "First name must be at most 80 characters"),

  lastName: z
    .string({ message: "Last name is required" })
    .min(3, "Last name must be at least 3 characters")
    .max(80, "Last name must be at most 80 characters"),

  email: z
    .string({ message: "Email is required" })
    //.min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string({ message: "Phone number is required" })
    .min(1, { message: "Phone number is required" }),
  // .regex(/^(?:\+49|0049|0)1[5-7]\d{1,2}[\s-]?\d{7,8}$/, {
  //   message: "Please enter a valid german mobile number",
  // }),

  // birthday: z
  //   .date({ message: "Birthday is reqired" })
  //   .transform((date) => date.toISOString()),
});

// 1. PUBLIC BOOKING SCHEMAS

export const BookingRequestValidationSchema = z.object({
  description: z
    .string()
    .min(1, "Tattoo description is required")
    .max(2000, "you can describe at most 2000 characters"),

  budgetRange: z
    .string({ message: "Please select a budget range" })
    .min(1, "Please select a budget range"),

  // studioChooses: z
  //   .boolean({ message: "Please choose an option" }),

  // source: z
  //   .string()
  //   .min(1, "Please select how you found us"),

  //referrer: z.string().optional(),

  bookingType: z
    .string({ message: "Please select a booking type" })
    .min(1, "Please select a booking type"),

  placement: z
    .string()
    .min(1, "Placement is required")
    .max(120, "you can describe at most 120 characters"),

  consultDate: z
    .date({ message: "Cunsult date is required" })
    .refine((date) => date.getDate() !== 0, {
      message: "Studio is closed on Sundays. Please choose another day",
    }),
  //.transform((date) => date.toISOString()),

  // sizeDescription: z
  //   .string()
  //   .min(1, "Size description is required")
  //   .max(200, "you can describe at most 200 characters"),

  // preferredDateFrom: z
  //   .date({ message: "Preferred date from is reqired" })
  //   .transform((date) => date.toISOString()),

  // preferredDateTo: z
  //   .date({ message: "Preferred date to is reqired" })
  //   .transform((date) => date.toISOString()),

  file: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= 10 * 1024 * 1024, {
          message: "Each image must be less than 10MG",
        })
        .refine((file) => file.type.startsWith("image/"), {
          message: "Only image files are allowed",
        }),
    )
    .max(10, "You can upload maxmimum 10 images"),
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
    .min(1, "Tattoo description is required")
    .max(2000, "You can describe at most 2000 characters"),
  placement: z
    .string()
    .min(1, "Placement is required")
    .max(120, "You can describe at most 120 characters"),
  tattooDate: z.date({ message: "Tattoo schedule date is required" }),
  artistId: z
    .string({ message: "Please assign an artist" })
    .min(1, "Artist selection is required"),
});

export const WalkInBookingSchema = z.object({
  client: ClientInfoValidationSchema,
  bookingRequest: WalkInRequestValidationSchema,
});

export type WalkInBookingFormData = z.infer<typeof WalkInBookingSchema>;
