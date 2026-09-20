"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
};

function mapProduct(p: any): ProductDTO {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice,
    category: p.category,
    image: p.image,
    images: JSON.parse(p.images || "[]"),
    rating: p.rating,
    reviews: p.reviews,
    inStock: p.inStock,
    featured: p.featured,
    tags: JSON.parse(p.tags || "[]"),
  };
}

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
}) {
  const where: any = {};
  if (options?.category && options.category !== "All") {
    where.category = options.category;
  }
  if (options?.featured) {
    where.featured = true;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return products.map(mapProduct);
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return null;
  return mapProduct(product);
}

export async function getCategories() {
  const result = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
  });
  return ["All", ...result.map((r) => r.category)];
}

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  originalPrice: z.coerce.number().positive().optional().nullable(),
  category: z.string().min(1),
  image: z.string().url(),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    originalPrice: formData.get("originalPrice") || null,
    category: formData.get("category"),
    image: formData.get("image"),
    inStock: formData.get("inStock") === "on",
    featured: formData.get("featured") === "on",
  };

  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const data = parsed.data;

  await prisma.product.create({
    data: {
      ...data,
      originalPrice: data.originalPrice || null,
      images: JSON.stringify([data.image]),
      tags: JSON.stringify([]),
      rating: 4.5,
      reviews: 0,
    },
  });

  revalidatePath("/products");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();

  const raw = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    originalPrice: formData.get("originalPrice") || null,
    category: formData.get("category"),
    image: formData.get("image"),
    inStock: formData.get("inStock") === "on",
    featured: formData.get("featured") === "on",
  };

  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const data = parsed.data;

  await prisma.product.update({
    where: { id },
    data: {
      ...data,
      originalPrice: data.originalPrice || null,
      images: JSON.stringify([data.image]),
    },
  });

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/products");
  revalidatePath("/admin");
  return { success: true };
}
