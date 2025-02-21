import { z } from "zod";

// Variant scheme
const variantSchema = z.object({
  size: z.enum(["S", "M", "L", "XL", "XXL", "Único"]),
  color: z.string().min(2).max(30),
  stock: z.number().int().nonnegative(),
  sku: z.string().min(5).max(20),
  price: z.number().positive().max(10000),
});

// Image scheme
const imageSchema = z.object({
  url: z.string().url(),
  altText: z.string().max(100).optional(),
});

// Product main scheme
export const productCreateSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(120),
    description: z.string().min(10).max(2000),
    brand: z.string().min(2).max(50),
    category: z.enum(["ropa", "electronica", "hogar", "deportes", "juguetes"]),
    variants: z.array(variantSchema).min(1),
    images: z.array(imageSchema).min(1).max(10),
    features: z
      .object({
        isFeatured: z.boolean().optional(),
        isOnSale: z.boolean().optional(),
        discountPercentage: z.number().min(0).max(100).optional(),
      })
      .optional(),
    specifications: z.record(z.string(), z.any()).optional(),
  }),
});

export const productUpdateSchema = productCreateSchema.partial();
