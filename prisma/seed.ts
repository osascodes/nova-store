import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  {
    id: "1",
    name: "Minimalist Leather Watch",
    description:
      "A timeless timepiece crafted from premium Italian leather and sapphire crystal. Water-resistant to 50m with a precise Japanese quartz movement. Perfect for everyday elegance.",
    price: 189,
    originalPrice: 249,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    ]),
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    tags: JSON.stringify(["watch", "leather", "minimal"]),
  },
  {
    id: "2",
    name: "Wireless Noise-Canceling Headphones",
    description:
      "Immersive sound with industry-leading noise cancellation. 30-hour battery life, premium memory foam ear cushions, and crystal-clear call quality. Designed for focus and travel.",
    price: 299,
    originalPrice: 349,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    ]),
    rating: 4.9,
    reviews: 312,
    inStock: true,
    featured: true,
    tags: JSON.stringify(["audio", "wireless", "noise-canceling"]),
  },
  {
    id: "3",
    name: "Premium Cotton Oversized Tee",
    description:
      "Ultra-soft 100% organic cotton oversized fit. Pre-washed for zero shrinkage. Available in multiple colors. The everyday essential elevated.",
    price: 48,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    ]),
    rating: 4.7,
    reviews: 89,
    inStock: true,
    featured: true,
    tags: JSON.stringify(["tshirt", "organic", "casual"]),
  },
  {
    id: "4",
    name: "Ceramic Pour-Over Coffee Set",
    description:
      "Handcrafted ceramic pour-over set with precision dripper and matching carafe. Includes paper filters. Designed for the perfect morning ritual.",
    price: 78,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    ]),
    rating: 4.6,
    reviews: 56,
    inStock: true,
    featured: false,
    tags: JSON.stringify(["coffee", "ceramic", "kitchen"]),
  },
  {
    id: "5",
    name: "Slim Leather Wallet",
    description:
      "RFID-blocking slim wallet made from full-grain leather. Holds 6 cards + cash. Ages beautifully over time. Minimalist design that fits any pocket.",
    price: 65,
    originalPrice: 85,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    ]),
    rating: 4.8,
    reviews: 203,
    inStock: true,
    featured: true,
    tags: JSON.stringify(["wallet", "leather", "minimal"]),
  },
  {
    id: "6",
    name: "Smart LED Desk Lamp",
    description:
      "Adjustable color temperature and brightness with touch controls. Wireless charging pad built into the base. Perfect for work and late-night reading.",
    price: 129,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    ]),
    rating: 4.5,
    reviews: 78,
    inStock: true,
    featured: false,
    tags: JSON.stringify(["lamp", "smart", "desk"]),
  },
  {
    id: "7",
    name: "Linen Blend Summer Shirt",
    description:
      "Breathable linen-cotton blend in a relaxed fit. Perfect for warm weather. Features mother-of-pearl buttons and a subtle chest pocket.",
    price: 89,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ]),
    rating: 4.7,
    reviews: 45,
    inStock: true,
    featured: false,
    tags: JSON.stringify(["shirt", "linen", "summer"]),
  },
  {
    id: "8",
    name: "Portable Bluetooth Speaker",
    description:
      "360° immersive sound in a compact, waterproof design. 12-hour playtime and built-in mic for calls. Pair two for stereo mode.",
    price: 99,
    originalPrice: 129,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    ]),
    rating: 4.6,
    reviews: 167,
    inStock: true,
    featured: false,
    tags: JSON.stringify(["speaker", "bluetooth", "portable"]),
  },
];

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nova.demo" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@nova.demo",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin created:", admin.email);

  // Create demo user
  const userPassword = await bcrypt.hash("demo123", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@nova.demo" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@nova.demo",
      password: userPassword,
      role: "USER",
    },
  });
  console.log("Demo user created:", user.email);

  // Clear and seed products
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`Seeded ${products.length} products`);

  console.log("\n✅ Seed complete!");
  console.log("Admin login: admin@nova.demo / admin123");
  console.log("User login:  demo@nova.demo / demo123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
