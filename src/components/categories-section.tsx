"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shirt, Headphones, Watch, Home } from "lucide-react";

const categories = [
  {
    name: "Apparel",
    href: "/products?category=Apparel",
    icon: Shirt,
    color: "bg-orange-50 dark:bg-orange-950/30 text-orange-600",
  },
  {
    name: "Electronics",
    href: "/products?category=Electronics",
    icon: Headphones,
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600",
  },
  {
    name: "Accessories",
    href: "/products?category=Accessories",
    icon: Watch,
    color: "bg-purple-50 dark:bg-purple-950/30 text-purple-600",
  },
  {
    name: "Home",
    href: "/products?category=Home",
    icon: Home,
    color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
            Browse
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={cat.href}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
              >
                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <cat.icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}