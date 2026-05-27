import { z } from "zod";
import { ARTICLE_STATUS } from "./article.types";

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title is too long"),

  excerpt: z
    .string()
    .min(20, "Excerpt must be at least 20 characters")
    .max(300, "Excerpt is too long"),

  content: z.string().min(50, "Content must be at least 50 characters"),

  status: z.enum(ARTICLE_STATUS),

  tags: z.array(z.string()).min(1, "At least one tag is required"),

  cover: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 10 * 1024 * 1024, {
      message: "Image must be less than 10MB",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});

export type CreateArticleSchemaType = z.infer<typeof createArticleSchema>;
