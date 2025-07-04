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
  tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
});

export type PostSchema = z.infer<typeof postSchema>;

export const userProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .max(100, "Email must be less than 100 characters")
    .trim()
    .email("Invalid email address"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username must be less than 50 characters"),
  bio: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be less than 15 characters")
    .regex(/^\+?[0-9\s\-()]+$/, "Phone number must be a valid format"),
  thumbnailMediaId: z.string().uuid("Invalid media ID format"),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;
