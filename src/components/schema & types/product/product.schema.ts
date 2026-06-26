import * as z from "zod";
import { ProductType } from "./product.types";

export const createPurchaseSchema = (productType: ProductType) =>
  z
    .object({
      productId: z.string().min(1),

      amount: z.number({ message: "Please enter a voucher amount" }).positive(),

      buyerName: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(120),

      buyerEmail: z.string().trim().email("Please enter a valid email address"),

      delivery: z.enum(["EMAIL", "EMAIL_AND_POST"]),

      shippingName: z.string().optional(),
      shippingLine1: z.string().optional(),
      shippingLine2: z.string().optional(),
      shippingPostalCode: z.string().optional(),
      shippingCity: z.string().optional(),
      shippingCountry: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      // CUSTOM voucher validation
      if (productType === "CUSTOM" && data.amount < 100) {
        ctx.addIssue({
          code: "custom",
          path: ["amount"],
          message: "Minimum voucher amount is €100",
        });
      }

      // Shipping validation
      if (data.delivery !== "EMAIL_AND_POST") return;

      const requiredFields = [
        {
          key: "shippingName",
          value: data.shippingName,
          message: "Recipient name is required",
        },
        {
          key: "shippingLine1",
          value: data.shippingLine1,
          message: "Address is required",
        },
        {
          key: "shippingPostalCode",
          value: data.shippingPostalCode,
          message: "Postal code is required",
        },
        {
          key: "shippingCity",
          value: data.shippingCity,
          message: "City is required",
        },
        {
          key: "shippingCountry",
          value: data.shippingCountry,
          message: "Country is required",
        },
      ];

      requiredFields.forEach((field) => {
        if (!field.value?.trim()) {
          ctx.addIssue({
            code: "custom",
            path: [field.key],
            message: field.message,
          });
        }
      });
    });

export type PurchaseFormData = z.infer<ReturnType<typeof createPurchaseSchema>>;
