"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const orderSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(5),
  apartment: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(3),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ),
});

export async function createOrder(data: z.infer<typeof orderSchema>) {
  const parsed = orderSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid order data" };
  }

  const session = await getSession();
  const { email, firstName, lastName, address, apartment, city, state, zip, items } =
    parsed.data;

  if (items.length === 0) {
    return { error: "Cart is empty" };
  }

  // Verify products exist and calculate total
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== productIds.length) {
    return { error: "One or more products not found" };
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = total >= 75 ? 0 : 9.99;
  const grandTotal = total + shipping;

  const shippingAddress = JSON.stringify({
    firstName,
    lastName,
    address,
    apartment: apartment || "",
    city,
    state,
    zip,
  });

  const order = await prisma.order.create({
    data: {
      userId: session?.id || null,
      email,
      total: grandTotal,
      status: "PAID", // demo: immediately mark as paid
      shippingAddress,
      items: {
        create: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
      },
    },
    include: { items: true },
  });

  return { success: true, orderId: order.id };
}

export async function getOrders() {
  const session = await getSession();
  if (!session) return [];

  if (session.role === "ADMIN") {
    return prisma.order.findMany({
      include: { items: { include: { product: true } }, user: true },
      orderBy: { createdAt: "desc" },
    });
  }

  return prisma.order.findMany({
    where: { userId: session.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
}
