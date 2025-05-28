import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  price: z
    .number()
    .min(1, "Price is required")
    .max(10000, "Price must be less than 10000"),
  roommates: z
    .number()
    .min(1, "Roommates is required")
    .max(10, "Roommates must be less than 10"),
  beginDate: z.date(),
  endDate: z.date(),
  tags: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
});

export type PostSchema = z.infer<typeof postSchema>;

export const userProfileSchema = z.object({
  bio: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be less than 15 characters")
    .regex(/^\+?[0-9\s]+$/, "Phone number must be a valid format")
    .optional(),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;
